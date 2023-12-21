package com.bigcent;

public class Price {
    public int bottles(int price, int n) {
        int basePrice = price * n;
        int tax = Math.round((basePrice * 9) / 100.0F);
        int paid = basePrice + tax;
        int cashBack = Math.round(paid / 100.0F);
        int specialMember = Math.round(((2 * cashBack) * 75) / 100.0F);
        return (paid - cashBack - cashBack - specialMember);
    }
    
    public String calculate(int x, int y) {
        int together = bottles(x + y, 1);
        int separate = bottles(x, 1) + bottles(y, 1);
        int diff = together - separate;
        return toJSON(String.format("(%3d, %3d) -> together: %d, separate: %d, diff: %d", x, y, together, separate, diff));
    }

    public String calculate(int p1, int n1, int p2, int n2) {;
        // System.out.format("p1: %d, n1: %d, p2: %d, n2: %d", p1, n1, p2, n2);
        int together = bottles(p1 + p2, n1 + n2);
        int separate = bottles(p1, n1) + bottles(p2, n2);
        int diff = together - separate;
        return toJSON(String.format("(%3d, %3d) -> together: %d, separate: %d, diff: %d", p1, p2, together, separate, diff));
    }
  
    public void helper(int price, int n) {
        int bottlesOne = bottles(price, 1);
        for (int i = 1; i <= n; i++) {
            int res = bottles(price, i);
            int diff = res - (i * bottlesOne);
            System.out.println(i + " : " + res + " : " + diff + " : " + (1.0f * diff / i));
        }
    }

    // public void calculate(int price, int n) {
    //     int[] commonPrices = {/*99, 149, 150, 179, 199, 249, 299, 349, 399,*/ 499, 549, 599, 699, 1099};
    //     for (int i = 0; i < commonPrices.length; i++) {
    //         for (int j = i; j < commonPrices.length; j++) {
    //             toJSON(calculate(commonPrices[i], commonPrices[j]));
    //         }
    //     }

    // }

    public String toJSON(String message) {
        String result = """
            {
                "message": "%s"
            }
            """.formatted(message);
        return result;
    }
}
