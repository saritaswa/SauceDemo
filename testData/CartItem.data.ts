export const ITEM = {
  INFO: {
        quantity: '1',
        name: 'Sauce Labs Backpack',
        price: '$29.99',
        description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
        subtotal: 'Item total: $29.99',
        tax: 'Tax: $2.40',
        total: 'Total: $32.39',
        paymentInfo: 'SauceCard #31337',
        shippingInfo: 'Free Pony Express Delivery!'
    },
} as const;
            

export type InfoType = keyof typeof ITEM;