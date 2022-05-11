import { PaymentType } from "../LanguageData";
import BaseCountry from "./BaseCountry";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Vietnam extends BaseCountry {
    @property({
        type: cc.Enum(PaymentType),
        override: true
    })
    public PaymentType: PaymentType = PaymentType.Zalopay  // 支付方式

    public CountryName = 'Vietnam'
    public GameName = null
    // public SecondName = 'Cài đặt để nhận 1000K₫'
    public Icon = 'Icon/vietnam'
    public InstallBtn = {bg: 'common/blue_btn2', font: 'Tải về'}
    public AndroidUrl = null
    public IosUrl = null
    public MoneyConfig = {data: [0, 300000, 600000, 1000000], symbol: '₫'}
}
