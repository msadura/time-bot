import { ethers } from 'ethers';
import JoeAbi from '@app/abi/JoeRouter02.json';
import { JOE_ROUTER } from '@app/addresses';
import { getProvider } from '@app/blockchain/provider';
import { TIME, USDT, WAVAX } from '@app/time/tokens';
import { PriceType, TokenPrice } from '@app/time/types';

export async function getTimePrice(
  priceType: PriceType = PriceType.sell
): Promise<TokenPrice | null> {
  if (priceType === PriceType.buy) {
    return getTimeBuyPrice();
  }

  const router = new ethers.Contract(JOE_ROUTER, JoeAbi, getProvider());
  try {
    const out = await router.getAmountsOut(ethers.utils.parseUnits('1', TIME.decimals), [
      TIME.address,
      WAVAX.address,
      USDT.address
    ]);

    // console.log(
    //   '🔥 $time price AVAX: ',
    //   ethers.utils.formatUnits(out[1] as ethers.BigNumber, WAVAX.decimals)
    // );
    // console.log(
    //   '🔥 $time price USD: ',
    //   ethers.utils.formatUnits(out[2] as ethers.BigNumber, USDT.decimals)
    // );

    return {
      avax: Number(ethers.utils.formatUnits(out[1] as ethers.BigNumber, WAVAX.decimals)),
      usd: Number(ethers.utils.formatUnits(out[2] as ethers.BigNumber, USDT.decimals))
    };
  } catch (e) {
    console.log('🔥 getTimePriceError', e);
  }

  return null;
}

export async function getTimeBuyPrice(): Promise<TokenPrice | null> {
  const router = new ethers.Contract(JOE_ROUTER, JoeAbi, getProvider());
  try {
    const out = await router.getAmountsOut(ethers.utils.parseUnits('10000', USDT.decimals), [
      USDT.address,
      WAVAX.address,
      TIME.address
    ]);

    const qtyUsdtStr = ethers.utils.formatUnits(out[2] as ethers.BigNumber, TIME.decimals);
    const qtyUsdtNum = Number(qtyUsdtStr);

    const qtyAvaxStr = ethers.utils.formatUnits(out[1] as ethers.BigNumber, WAVAX.decimals);
    const qtyAvaxNum = Number(qtyAvaxStr);

    const usdPrice = 10000 / qtyUsdtNum;
    const avaxPrice = qtyAvaxNum / qtyUsdtNum;

    return { avax: avaxPrice, usd: usdPrice };
  } catch (e) {
    console.log('🔥 getTimePriceError', e);
  }

  return null;
}
