/*
import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import ja from 'vee-validate/dist/locale/ja'

Vue.use(VeeValidate)

export default function({ app }: { app: any }) {
  Validator.localize('ja', ja)
  Validator.localize(app.i18n.loadedLanguages[0])
  app.i18n.beforeLanguageSwitch = (_oldLocale: string, newLocale: string) => {
    Validator.localize(newLocale)
  }
}
*/
import Vue from 'vue'
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize,
} from 'vee-validate'
import * as originalRules from 'vee-validate/dist/rules'
import ja from 'vee-validate/dist/locale/ja.json'

// 全てのルールをインポート
let rule
for (rule in originalRules) {
  extend(rule, {
    // @ts-ignore
    ...originalRules[rule], // eslint-disable-line
  })
}

// メッセージを設定
localize('ja', ja)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
