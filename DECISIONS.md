## Decision: [Discount Module]

**Context:** I have added a discount module, which allows admin to provide discount to the user

**Options Considered:**
- Option A: User wants a %age discount eg, 10% discount
- Option B: User wants a fixed amount discount 100$ OFF
- Option C: Admin wants to run a campaign like 10% Diwali sale for fixed period of time

**Choice:** I created two types of discount, voucher and coupons. Vouchers are fixed amount discount and coupons are percentage discount. Each user can use any discount code only once. Admin can create discount codes for different conditions and time period.

**Why:** Instead of automating generating discount codes automatically, I wanted to give the control to admin. She can herself create discounts 
for 10%, 20% and so on, and can revoke discounts as well. She also has the permission to cancel any order, and set expiry on discount codes. Each customer can use any discount code only once in a lifetime.