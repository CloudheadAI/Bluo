/** @type {{ port: number; stripeSecretKey: string; stripePriceProMonthly: string; stripePricePremiumMonthly: string; clientUrl: string }} */
const env = {
  port: parseInt(process.env.PORT || '3001', 10),
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
  stripePriceProMonthly: process.env.STRIPE_PRICE_PRO_MONTHLY || '',
  stripePricePremiumMonthly: process.env.STRIPE_PRICE_PREMIUM_MONTHLY || '',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
};

export default env;
