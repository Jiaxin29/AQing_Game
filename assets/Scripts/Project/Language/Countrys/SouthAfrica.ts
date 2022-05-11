import { PaymentType } from "../LanguageData";
import BaseCountry from "./BaseCountry";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SouthAfrica extends BaseCountry {
    @property({
        type: cc.Enum(PaymentType),
        override: true
    })
    public PaymentType: PaymentType = PaymentType.Paypal  // 支付方式

    public CountryName = 'aouthAfrica'
    public GameName = null
    // public SecondName = 'Instalar para obtener 90€'
    public Icon = 'Icon/aouthAfrica'
    public InstallBtn = {bg: 'common/blue_btn2', font: 'installeer'}
    public AndroidUrl = null
    public IosUrl = null
    public MoneyConfig = {data: [0, 300, 600, 1000], symbol: 'ZAR'}
}
