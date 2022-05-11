import { PaymentType } from "../LanguageData";
import BaseCountry from "./BaseCountry";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Malaysia extends BaseCountry {
    @property({
        type: cc.Enum(PaymentType),
        override: true
    })
    public PaymentType: PaymentType = PaymentType.Gcash  // 支付方式

    public CountryName = 'Malaysia'
    public GameName = null
    // public SecondName = 'Pasang untuk mendapat 400RM'
    public Icon = 'Icon/malaysia'
    public InstallBtn = {bg: 'common/blue_btn2', font: 'pasang'}
    public AndroidUrl = null
    public IosUrl = null
    public MoneyConfig = {data: [0, 100, 200, 400], symbol: 'RM'}
}
