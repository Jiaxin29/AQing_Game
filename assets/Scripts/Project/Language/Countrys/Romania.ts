import { PaymentType } from "../LanguageData";
import BaseCountry from "./BaseCountry";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Romania extends BaseCountry {
    @property({
        type: cc.Enum(PaymentType),
        override: true
    })
    public PaymentType: PaymentType = PaymentType.Visa  // 支付方式

    public CountryName = 'romania'
    public GameName = null
    // public SecondName = 'Instalar para obtener 90€'
    public Icon = 'Icon/romania'
    public InstallBtn = {bg: 'common/blue_btn2', font: 'instalare'}
    public AndroidUrl = null
    public IosUrl = null
    public MoneyConfig = {data: [0, 117, 243, 435], symbol: 'ROL'}
}
