import { MIN_ALERT_DISCOUNT } from '@app/constants';
import { sendMessage } from '@app/discord';
import getDiscounts from '@app/time/getDiscounts';
import { Discount } from '@app/time/types';

const COOLDOWN_TIME = 1000 * 60 * 5; //5min

let prevDiscountsToAlert: Discount[] = [];
let prevAlert: number | null = null;

export default async function checkAndAlert() {
  if (prevAlert && Date.now() - prevAlert < COOLDOWN_TIME) {
    return;
  }

  const discounts = await getDiscounts();
  const discountsToAlert: Discount[] = [];

  // console.log('🔥', discounts);

  discounts.forEach(d => {
    if (d.discount && d.discount > MIN_ALERT_DISCOUNT) {
      discountsToAlert.push(d);
    }
  });

  if (discountsToAlert.length > 0 && haveDiscountsChanged(discountsToAlert)) {
    prevAlert = Date.now();

    sendMessage(
      '--- 🔥 Time discounts alert 🔥 ---' +
        discountsToAlert.map(d => `\n     ${d.bond} - ${d.discount?.toFixed(2)}%`) +
        '\n------ @everyone'
    );
  }

  prevDiscountsToAlert = discountsToAlert || [];
}

function haveDiscountsChanged(discounts: Discount[]) {
  return JSON.stringify(discounts) !== JSON.stringify(prevDiscountsToAlert);
}
