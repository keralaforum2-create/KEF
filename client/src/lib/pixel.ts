export const trackPixelEvent = (eventName: string, eventData?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, eventData || {});
  }
};

export const pixelEvents = {
  pageView: () => trackPixelEvent('PageView'),
  initiate: () => trackPixelEvent('InitiateCheckout'),
  purchase: (data: { value: number; currency: string }) => 
    trackPixelEvent('Purchase', {
      value: data.value,
      currency: data.currency
    }),
  registration: (data: { value: number }) =>
    trackPixelEvent('Lead', {
      value: data.value
    }),
  viewContent: (data: { content_name: string; content_type: string }) =>
    trackPixelEvent('ViewContent', {
      content_name: data.content_name,
      content_type: data.content_type
    }),
  addToCart: (data: { value: number; currency: string }) =>
    trackPixelEvent('AddToCart', {
      value: data.value,
      currency: data.currency
    })
};
