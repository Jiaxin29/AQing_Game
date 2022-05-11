import { PaymentType } from "../LanguageData";
import BaseCountry from "./BaseCountry";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Indonesian extends BaseCountry {
    @property({
        type: cc.Enum(PaymentType),
        override: true
    })
    public PaymentType: PaymentType = PaymentType.Dana  // 支付方式

    public CountryName = 'indonesian'
    public GameName = null
    // public SecondName = 'Unduh dan dapatkan 1000KRp'
    public Icon = 'Icon/indo'
    public InstallBtn = {bg: 'common/blue_btn2', font: 'Unduh'}
    public AndroidUrl = null
    public IosUrl = null
    public MoneyConfig = {data: [0, 300000, 600000, 1000000], symbol: 'Rp'}
}
