import { PaymentType } from "../LanguageData";
import BaseCountry from "./BaseCountry";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Brazil extends BaseCountry {
    @property({
        type: cc.Enum(PaymentType),
        override: true
    })
    public PaymentType: PaymentType = PaymentType.Paypal  // 支付方式

    public CountryName = 'brazil'
    public GameName = null
    // public SecondName = 'Instale para obter 400R$'
    public Icon = 'Icon/brazil'
    public InstallBtn = {bg: 'language/install/brazil'}
    public AndroidUrl = null
    public IosUrl = null
    public MoneyConfig = {data: [0, 100, 200, 400], symbol: 'R$'}
}
