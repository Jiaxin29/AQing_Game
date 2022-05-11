import { PaymentType } from "../LanguageData";
import BaseCountry from "./BaseCountry";

const {ccclass, property} = cc._decorator;

@ccclass
export default class France extends BaseCountry {
    @property({
        type: cc.Enum(PaymentType),
        override: true
    })
    public PaymentType: PaymentType = PaymentType.Paypal  // 支付方式

    public CountryName = 'france'
    public GameName = null
    // public SecondName = 'Instalar para obtener 90€'
    public Icon = 'Icon/france'
    public InstallBtn = {bg: 'common/blue_btn2', font: 'Télécharger'}
    public AndroidUrl = null
    public IosUrl = null
    public MoneyConfig = {data: [0, 30, 60, 90], symbol: '€'}
}
