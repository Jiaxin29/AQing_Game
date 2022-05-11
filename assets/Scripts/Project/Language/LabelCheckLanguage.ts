import { Country } from "./LanguageData";
import LanguageManager from "./LanguageManager";

const {ccclass, property} = cc._decorator;

@ccclass('LabelCheckLanguageList')
class LabelCheckLanguageList {
    @property({type: cc.Enum(Country)})
    chooseCountry: Country = Country.USA
    
    @property(cc.String)
    str: String = ''
}

@ccclass
export default class NewClass extends cc.Component {

    @property([LabelCheckLanguageList])
    public checkList: LabelCheckLanguageList[] = []

    onLoad () {
        
    }

    start () {
        this.checkLanguage()
    }

    checkLanguage() {
        if (!LanguageManager.ME.checkIsUpdateLanguage()) {
            return
        }

        this.checkLabel()
    }

    checkLabel() {
        let label = this.node.getComponent(cc.Label)
        if (!label) {
            return
        }

        let str = null
        for (let i = 0; i < this.checkList.length; i++) {
            let data = this.checkList[i]
            if (data.chooseCountry == LanguageManager.ME.country) {
                str = data.str
                break                
            }
        }

        if (!str) {
            return
        }

        label.string = str
    }

    // update (dt) {}
}
