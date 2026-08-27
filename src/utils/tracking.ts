const STORAGE_KEY = 'cardoso3d_tracking_params';

export const TRACKING_KEYS = [
  'src',
  'sck',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'fbclid'
];

// Helper to get all stored parameters from both sessionStorage, localStorage, and current URL
export const getCapturedTrackingParams = (): Record<string, string> => {
  const params: Record<string, string> = {};

  if (typeof window === 'undefined') return params;

  // 1. Read from sessionStorage
  try {
    const sessionData = sessionStorage.getItem(STORAGE_KEY);
    if (sessionData) {
      Object.assign(params, JSON.parse(sessionData));
    }
  } catch (e) {
    console.error('Error reading from sessionStorage:', e);
  }

  // 2. Read from localStorage as secondary backup
  try {
    const localData = localStorage.getItem(STORAGE_KEY);
    if (localData) {
      const localParams = JSON.parse(localData);
      Object.entries(localParams).forEach(([k, v]) => {
        if (!params[k] && typeof v === 'string') {
          params[k] = v;
        }
      });
    }
  } catch (e) {
    console.error('Error reading from localStorage:', e);
  }

  // 3. Read from URL search params (highest priority on arrival)
  try {
    const searchParams = new URLSearchParams(window.location.search);
    let hasNew = false;
    TRACKING_KEYS.forEach(key => {
      const val = searchParams.get(key);
      if (val) {
        params[key] = val;
        hasNew = true;
      }
    });

    // Also capture any extra utm_* keys
    searchParams.forEach((val, key) => {
      if (key.startsWith('utm_') && val) {
        params[key] = val;
        hasNew = true;
      }
    });

    if (hasNew) {
      saveStoredParams(params);
    }
  } catch (e) {
    console.error('Error parsing search params:', e);
  }

  return params;
};

// Builder function for Hotmart Checkout URLs with complete tracking parameter propagation
export const buildHotmartCheckoutUrl = (
  baseUrl: string,
  extraParams?: Record<string, string>
): string => {
  if (typeof window === 'undefined') return baseUrl;

  const captured = getCapturedTrackingParams();
  const allParams = { ...captured, ...(extraParams || {}) };

  const queryParts: string[] = [];

  // Determine 'src':
  // 1. If explicit 'src' exists, always use it directly (never overwrite).
  // 2. If NO 'src' exists, copy 'utm_source' into 'src' for Hotmart sales attribution reports.
  const explicitSrc = allParams['src'];
  const utmSource = allParams['utm_source'];
  const effectiveSrc = explicitSrc || utmSource;

  if (effectiveSrc) {
    queryParts.push(`src=${encodeURIComponent(effectiveSrc)}`);
  }

  // Explicit priority order for standard parameters
  const standardKeys = ['sck', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'];
  standardKeys.forEach(key => {
    const val = allParams[key];
    if (val) {
      queryParts.push(`${key}=${encodeURIComponent(val)}`);
    }
  });

  // Append any other tracking keys captured that aren't in the standard list or 'src'
  Object.keys(allParams).forEach(key => {
    if (!standardKeys.includes(key) && key !== 'src' && allParams[key]) {
      queryParts.push(`${key}=${encodeURIComponent(allParams[key])}`);
    }
  });

  if (queryParts.length === 0) {
    return baseUrl;
  }

  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}${queryParts.join('&')}`;
};

export const buildZdzCheckoutUrl = (
  baseUrl = 'https://pay.hotmart.com/H103748861J?checkoutMode=10'
): string => {
  return buildHotmartCheckoutUrl(baseUrl);
};

// Helper to get all stored parameters from both sessionStorage and localStorage
export const getStoredParams = (): Record<string, string> => {
  return getCapturedTrackingParams();
};

// Helper to save params to both storages
export const saveStoredParams = (params: Record<string, string>) => {
  try {
    const dataStr = JSON.stringify(params);
    sessionStorage.setItem(STORAGE_KEY, dataStr);
    localStorage.setItem(STORAGE_KEY, dataStr);
  } catch (e) {
    console.error('Error saving tracking params to storage:', e);
  }
};

// 1. Capture and sync parameters from URL
export const captureAndSyncParams = (): Record<string, string> => {
  const currentParams = getStoredParams();
  const searchParams = new URLSearchParams(window.location.search);
  let hasNew = false;
  
  searchParams.forEach((value, key) => {
    if (value && currentParams[key] !== value) {
      currentParams[key] = value;
      hasNew = true;
    }
  });

  if (hasNew) {
    saveStoredParams(currentParams);
  }
  return currentParams;
};

// Helper to append stored parameters to any URL string
export const appendStoredParamsToUrl = (urlStr: string): string => {
  try {
    const storedParams = getStoredParams();
    if (Object.keys(storedParams).length === 0) return urlStr;

    // Detect if relative or absolute
    const isRelative = urlStr.startsWith('/') || (!urlStr.startsWith('http') && !urlStr.startsWith('mailto:') && !urlStr.startsWith('tel:') && !urlStr.startsWith('#') && !urlStr.startsWith('javascript:'));
    const base = isRelative ? window.location.origin : undefined;
    const urlObj = new URL(urlStr, base || window.location.href);

    Object.entries(storedParams).forEach(([key, val]) => {
      if (!urlObj.searchParams.has(key)) {
        urlObj.searchParams.set(key, val);
      }
    });

    if (isRelative && urlStr.startsWith('/')) {
      return urlObj.pathname + urlObj.search + urlObj.hash;
    } else {
      return urlObj.toString();
    }
  } catch (e) {
    return urlStr;
  }
};

// 2. Silently restore parameters to browser address bar if missing
export const restoreParamsToAddressBar = () => {
  const storedParams = getStoredParams();
  if (Object.keys(storedParams).length === 0) return;

  const currentUrl = new URL(window.location.href);
  let hasMissing = false;

  Object.entries(storedParams).forEach(([key, val]) => {
    if (!currentUrl.searchParams.has(key)) {
      currentUrl.searchParams.set(key, val);
      hasMissing = true;
    }
  });

  if (hasMissing) {
    window.history.replaceState(window.history.state, '', currentUrl.pathname + currentUrl.search + currentUrl.hash);
  }
};

// 3. Dynamically propagate parameters to links (relative links or external checkouts)
export const propagateTrackingParamsToLinks = () => {
  const storedParams = getStoredParams();
  if (Object.keys(storedParams).length === 0) return;

  const links = document.querySelectorAll('a');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    // Check if relative or checkout platform
    const isRelative = href.startsWith('/') || (!href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('#') && !href.startsWith('javascript:'));
    const isCheckout = /hotmart|kiwify|eduzz|monetizze|checkout|pay\./i.test(href);

    if (isRelative || isCheckout) {
      try {
        const base = href.startsWith('/') ? window.location.origin : undefined;
        const urlObj = new URL(href, base || window.location.href);
        
        let hasChanges = false;
        Object.entries(storedParams).forEach(([key, val]) => {
          if (!urlObj.searchParams.has(key)) {
            urlObj.searchParams.set(key, val);
            hasChanges = true;
          }
        });

        if (hasChanges) {
          if (href.startsWith('/')) {
            const relativeHref = urlObj.pathname + urlObj.search + urlObj.hash;
            if (link.getAttribute('href') !== relativeHref) {
              link.setAttribute('href', relativeHref);
            }
          } else {
            const absoluteHref = urlObj.toString();
            if (link.getAttribute('href') !== absoluteHref) {
              link.setAttribute('href', absoluteHref);
            }
          }
        }
      } catch (e) {
        // ignore malformed URLs
      }
    }
  });
};

// Propagate to forms that post/get to checkout endpoints
export const propagateTrackingParamsToForms = () => {
  const storedParams = getStoredParams();
  if (Object.keys(storedParams).length === 0) return;

  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    const action = form.getAttribute('action');
    if (action && /hotmart|kiwify|eduzz|monetizze|checkout|pay\./i.test(action)) {
      try {
        const urlObj = new URL(action, window.location.href);
        let hasChanges = false;
        Object.entries(storedParams).forEach(([key, val]) => {
          if (!urlObj.searchParams.has(key)) {
            urlObj.searchParams.set(key, val);
            hasChanges = true;
          }
          // hidden input element
          let input = form.querySelector(`input[name="${key}"]`) as HTMLInputElement;
          if (!input) {
            input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = val;
            form.appendChild(input);
          } else if (input.value !== val) {
            input.value = val;
          }
        });
        if (hasChanges) {
          form.setAttribute('action', urlObj.toString());
        }
      } catch (e) {
        // ignore
      }
    }
  });
};

// 4. Override History API to capture dynamic router navigation in SPA
let isOverrideInitialized = false;
export const initHistoryOverride = () => {
  if (typeof window === 'undefined' || isOverrideInitialized) return;

  const originalPushState = window.history.pushState;
  const originalReplaceState = window.history.replaceState;

  window.history.pushState = function(state, unused, url) {
    if (url) {
      const newUrl = appendStoredParamsToUrl(url.toString());
      return originalPushState.apply(this, [state, unused, newUrl]);
    }
    return originalPushState.apply(this, [state, unused, url]);
  };

  window.history.replaceState = function(state, unused, url) {
    if (url) {
      const newUrl = appendStoredParamsToUrl(url.toString());
      return originalReplaceState.apply(this, [state, unused, newUrl]);
    }
    return originalReplaceState.apply(this, [state, unused, url]);
  };

  isOverrideInitialized = true;
};

// Full self-initializing tracking system setup
export const initTrackingSystem = () => {
  if (typeof window === 'undefined') return () => {};

  // 1. Capture and Sync
  captureAndSyncParams();

  // 2. Restore to Address Bar
  restoreParamsToAddressBar();

  // 4. Override Router/History API
  initHistoryOverride();

  // 3. Dynamic link propagation
  propagateTrackingParamsToLinks();
  propagateTrackingParamsToForms();

  // Loop every 500ms for dynamic content detection
  const intervalId = setInterval(() => {
    propagateTrackingParamsToLinks();
    propagateTrackingParamsToForms();
  }, 500);

  // Interaction event listeners
  const events = ['mouseover', 'touchstart', 'mousedown', 'click'];
  const triggerPropagation = () => {
    propagateTrackingParamsToLinks();
    propagateTrackingParamsToForms();
  };

  events.forEach(eventName => {
    document.addEventListener(eventName, triggerPropagation);
  });

  return () => {
    clearInterval(intervalId);
    events.forEach(eventName => {
      document.removeEventListener(eventName, triggerPropagation);
    });
  };
};
