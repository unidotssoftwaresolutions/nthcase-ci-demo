# NthCase Demo — the web twin

The web version of **NthCase Demo**, the small made-up shop "Fernwood Goods" that also exists for Android
(`GuruAI/tests/GuruAI.Evals/android-demo-app`) and iOS (`…/ios-demo-app`). It exists for NthCase's clips and the
product video, which run one plain-English test on web, Android and iOS. It has the same five screens, texts, ten
products, prices, ids and labels as the Android app, whose README is the source of truth.

**Address:** <https://unidotssoftwaresolutions.github.io/nthcase-ci-demo/app/>

It is deployed with the rest of `site/`. The one-page shop at the site's root, and the CI scenario that tests it, are
separate and unchanged.

Plain HTML, CSS and JavaScript (`index.html`, `app.css`, `app.js`, plus `nthcase_mark.png` copied from the Android
app). There is no framework, no build step and no network request. Everything is kept in memory: each page load
starts signed out with an empty cart, and nothing goes to `localStorage` or cookies. Demo account:
`demo@nthcase.com` / `demo1234`.

## Screens

The hash picks the screen, so the browser's Back works like Android's.

| Hash | Screen |
| --- | --- |
| `#/signin` | **Sign in**: e-mail, password, **Sign in**, the demo-account card with **Use demo account**. A wrong try shows *Wrong e-mail or password.* |
| `#/products` | **Products**: ten cards, **Search products**, **Cart** with its count, **Sign out**. |
| `#/product/<slug>` | **Product details**: picture, description, quantity 1–10, **Add to cart**. Then "Added to cart" with **View cart** for 2.75 s. |
| `#/cart` | **Cart**: − / +, **Remove**, line totals, **Total**, **Checkout**, **Continue shopping**. With nothing in it: *Your cart is empty* and **Browse products**. |
| `#/order-placed` | **Order placed** and **Back to products**. |

The slugs are `mug`, `notebook`, `plant`, `candle`, `tote`, `bottle`, `clock`, `lamp`, `sunglasses` and `umbrella`.
Any screen opened while signed out shows Sign in. Sign in and Sign out leave no history entry behind, so Back on
the products screen leaves the shop, as Back leaves the Android app. Checkout leaves only Order placed above the
products.

Layout:
- On a phone, the shop fills the screen.
- On a wider window, it sits in a centred column 420 px wide with two product columns.
- From a 1000 px wide window, or on a phone held sideways, the column is 640 px with three product columns.
- Light and dark follow `prefers-color-scheme`, with the Android app's `colors.xml` and `values-night` colours.
- The pictures are inline SVG made from the Android vector drawables' own `pathData` and colours.

## Ids and labels a test can use

Each id is the Android resource-id name. The accessible name (`aria-label`, or `alt` on the logo) is the Android
content description. Buttons are `<button>` and fields are `<input>` with a `<label>`, so a test can also find them
by role and name.

| Screen | `id` | Accessible name / text |
| --- | --- | --- |
| Sign in | `email_input`, `password_input` | "E-mail", "Password" |
| | `sign_in_button` | "Sign in" |
| | `sign_in_error` | "Wrong e-mail or password." (`hidden` until a wrong try) |
| | `demo_account_details`, `use_demo_account` | "Demo account. E-mail: demo@nthcase.com. Password: demo1234.", "Use demo account" |
| | `app_title`, `brand_mark` | "NthCase Demo", "NthCase Demo logo" |
| Products | `search_input` | "Search products" |
| | `product_mug`, `product_notebook`, `product_plant`, `product_candle`, `product_tote`, `product_bottle`, `product_clock`, `product_lamp`, `product_sunglasses`, `product_umbrella` | "Morning Mug, $14.00" (name, price) |
| | inside each card: `data-id="product_name"`, `data-id="product_price"`, `data-id="product_image"` | |
| | `products_empty` | "No products match your search." |
| | `cart_action` (toolbar), `cart_count` | "Cart", the item count as its text (`hidden` at 0) |
| | `action_sign_out` (toolbar) | "Sign out" |
| Product details | `detail_name`, `detail_price`, `detail_description`, `detail_image` | their texts; "Picture of Morning Mug" |
| | `qty_decrease`, `qty_value`, `qty_increase` | "Decrease quantity", "Quantity 1", "Increase quantity" |
| | `add_to_cart` | "Add to cart", then `snackbar_text` "Added to cart" with `snackbar_action` "View cart" |
| | toolbar back arrow (no id, as on Android) | "Back" |
| Cart | `cart_line_mug` … `cart_line_umbrella` (one per product) | "Morning Mug in cart" |
| | inside each line: `data-id="cart_line_decrease"`, `"cart_line_qty"`, `"cart_line_increase"`, `"cart_line_remove"`, `"cart_line_total"` | "Decrease Morning Mug", "Quantity of Morning Mug: 2", "Increase Morning Mug", "Remove Morning Mug", "Morning Mug total $28.00" |
| | `cart_total` | "Total $28.00" |
| | `checkout_button`, `continue_shopping` | "Checkout", "Continue shopping" |
| | `cart_empty`, `cart_empty_title`, `browse_products` | the empty state, "Your cart is empty", "Browse products" |
| Order placed | `order_placed_title`, `order_placed_message`, `back_to_products` | "Order placed", the message, "Back to products" |

**About `data-id`:** an id must be unique on a web page. Android repeats some ids inside every card or line
(`product_name`, `cart_line_qty`, …). Here those are `data-id` attributes with the same name, found inside their card
or line. For example: `#cart_line_mug [data-id="cart_line_qty"]`. The lines also carry `data-id="cart_line_image"`,
`"cart_line_name"` and `"cart_line_price"`, as in Android's layout.

Only the open screen is in the page, so the ids of other screens do not exist until you open them. Hidden states
(`sign_in_error`, `products_empty`, `cart_count` at 0, the cart's content or its empty state) use the `hidden`
attribute, like Android's `gone`.
