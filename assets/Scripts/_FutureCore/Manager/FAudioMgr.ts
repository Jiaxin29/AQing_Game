/*
    aoemo.com
*/

import { CoreDispatcher } from "../Dispatcher/CoreDispatcher";
import { CoreMsgBase } from "../Data/CoreMsgBase";

const { ccclass } = cc._decorator;

@ccclass
export default class FAudioMgr extends cc.Component {
	bgm_audioId: number = null;
	soundCacheList: cc.AudioClip[] = [];
	switchSetting = {
		eff: 1,
		bgm: 1,
		shake: 1,
	}
	public isCanPlaySound: boolean = false
	public currentPlayEffectList: Map<string, number>

	onLoad() {
		cc.log("[FAudioMgr]Init");

		cc.loader.loadResDir("music", (error, resource: cc.AudioClip[], urls) =>{
            if (!error){
                resource.forEach((value, index, array) => {
                    let fileName = value["name"];
                    this.soundCacheList[fileName] = value;
				});

				// 音效资源读取完毕
				CoreDispatcher.Me.Dispatch(CoreMsgBase.AudioLoadFinish_Base, null);
            }else{
                console.log(`[FAudioMgr]loadResDir failed`);
            }
        })

		this.currentPlayEffectList = new Map<string, number>()
	}

	// 播放音效
	PlayEffect(name, volume = 1) {
		if (!this.isCanPlaySound) {
			return
		}

		if (this.switchSetting.eff) {
			let audioId = -1
			if (this.soundCacheList[name]) {
				audioId = cc.audioEngine.play(this.soundCacheList[name], false, volume);
				this.pushCurrentEffect(name, audioId)
			}
			else {
				cc.loader.loadRes(`music/${name}`, (err, path) => {
					if (!err) {
						this.soundCacheList[name] = path;
						audioId = cc.audioEngine.play(path, false, volume);
						this.pushCurrentEffect(name, audioId)
					}
				});
			}
		}
	}

	// 播放背景音乐
	PlayBgm(name, volume = 0.5) {
		if (!this.isCanPlaySound) {
			return
		}
		
		if (this.switchSetting.bgm) {
			if (this.soundCacheList[name]) {
				if (this.bgm_audioId != null)
					cc.audioEngine.stop(this.bgm_audioId);
					this.bgm_audioId = cc.audioEngine.play(this.soundCacheList[name], true, volume);
			}
			else {
				cc.loader.loadRes(`music/${name}`, (err, path) => {
					if (!err) {
						if (this.bgm_audioId != null)
							cc.audioEngine.stop(this.bgm_audioId);
						this.soundCacheList[name] = path;
						this.bgm_audioId = cc.audioEngine.play(path, true, volume);
					}
				});
			}
		}
		else {
			if (this.bgm_audioId != null)
				cc.audioEngine.stop(this.bgm_audioId);
		}
	}

	// 选择静音
	CloseMusic() {
		this.StopAll();
	}

	// 取消静音
	OpenMusic(bgm: string, volume: number = 1) {
		this.PlayBgm(bgm, volume);
	}

	// 停止所有音乐
	StopAll() {
		cc.audioEngine.stopAll();
	}

	// 暂停音乐
	PauseMusic() {
		if (this.bgm_audioId != null) {
			cc.audioEngine.pause(this.bgm_audioId);
		}
	}

	// 继续播放
	ResumeMusic() {
		if (this.bgm_audioId != null) {
			cc.audioEngine.resume(this.bgm_audioId);
		}
		else {
			this.PlayBgm('bgm_MainScene');
		}
	}

	// 打开所有音乐音效
	OpenAllSound() {
		this.isCanPlaySound = true
		this.ResumeMusic()
	}

	// 关闭所有音乐音效
	CloseAllSound() {
		this.isCanPlaySound = false
		this.PauseMusic()
	}

	// 降低bgm音效，过x秒后回来
	turnDownBgm(num: number = 2.6) {
		if (this.bgm_audioId != null) {
			let volumn =  cc.audioEngine.getVolume(this.bgm_audioId)
			cc.audioEngine.setVolume(this.bgm_audioId, 0.2);

			this.scheduleOnce(()=>{
				cc.audioEngine.setVolume(this.bgm_audioId, volumn);
			}, num)
		}
	}

	// 记录音效
	pushCurrentEffect(name: string, audioID: number) {
		let str = name + audioID
		this.currentPlayEffectList.set(str, audioID)
		cc.audioEngine.setFinishCallback(audioID, ()=>{
			this.currentPlayEffectList.delete(str)
		})
	} 

	// 停止音效(如果有两个同样的音效，那么只会删除前面那个 )
	stopEffect(name: string) {
		for (let [key, value] of this.currentPlayEffectList) {
			if (key.indexOf(name) > -1) {
				cc.audioEngine.stopEffect(value)
				this.currentPlayEffectList.delete(key)
				break
			}
		}
	} 
}