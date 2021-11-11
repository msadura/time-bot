import { MIN_ALERT_DISCOUNT } from '@app/constants';
import { sendMessage } from '@app/discord';
import getDiscounts from '@app/time/getDiscounts';
import { Discount } from '@app/time/types';

let prevDiscountsToAlert: Discount[] = [];

export default async function checkAndAlert() {
  const discounts = await getDiscounts();
  const discountsToAlert: Discount[] = [];

  discounts.forEach(d => {
    if (d.discount && d.discount > MIN_ALERT_DISCOUNT) {
      discountsToAlert.push(d);
    }
  });

  if (discountsToAlert.length > 0 && haveDiscountsChanged(discountsToAlert)) {
    sendMessage(
      '--- 🔥 Time discounts alert 🔥 ---' +
        discountsToAlert.map(d => `\n     ${d.bond} - ${d.discount?.toFixed(2)}%`) +
        '\n------ @here'
    );
  }

  prevDiscountsToAlert = discountsToAlert || [];
}

function haveDiscountsChanged(discounts: Discount[]) {
  return JSON.stringify(discounts) !== JSON.stringify(prevDiscountsToAlert);
}
