import { PaymentType } from "../LanguageData";
import BaseCountry from "./BaseCountry";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Korea extends BaseCountry {
    @property({
        type: cc.Enum(PaymentType),
        override: true
    })
    public PaymentType: PaymentType = PaymentType.Kakaopay  // 支付方式

    public CountryName = 'korea'
    public GameName = 'Korea-Gamename'
    // public SecondName = '설치하면 150000원'
    public Icon = 'Icon/japan'
    public InstallBtn = {bg: 'common/blue_btn2', font: '설치'}
    public AndroidUrl = null
    public IosUrl = null
    public MoneyConfig = {data: [0, 50000, 100000, 150000], symbol: '원'}
    public reverseMoneyTag = true
}
