import { PaymentType } from "../LanguageData";
import BaseCountry from "./BaseCountry";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Canada extends BaseCountry {
    @property({
        type: cc.Enum(PaymentType),
        override: true
    })
    public PaymentType: PaymentType = PaymentType.Paypal  // 支付方式

    public CountryName = 'canada'
    public GameName = null
    // public SecondName = 'Instalar para obtener 90€'
    public Icon = 'Icon/canada'
    // public InstallBtn = {bg: 'language/install/usa'}
    public AndroidUrl = null
    public IosUrl = null
    public MoneyConfig = {data: [0, 50, 100, 150], symbol: 'C$'}
}
