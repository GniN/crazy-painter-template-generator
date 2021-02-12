<template>
  <div class="template-generator">
    <div class="md-layout">
      <md-field>
          <label>杜撰(格式: 玩家暱稱,杜撰答案1,杜撰答案2)</label>
          <md-textarea v-model="userMocksRawInput" required></md-textarea>
          <span class="md-helper-text"></span>
      </md-field>
      <md-field>
        <label>圖片網址</label>
        <md-input v-model="imageUrlsRawInput" required></md-input>
      </md-field>
      <md-field>
        <label>繪師</label>
        <md-input v-model="paintersRawInput" required></md-input>
      </md-field>
      <md-field>
        <label>答案</label>
        <md-input v-model="answersRawInput" required></md-input>
      </md-field>
    </div>
    <md-button @click="toggle" class="md-raised">杜撰切換</md-button>
    <md-button @click="generate" class="md-raised md-primary">產生</md-button>


    <md-content>
      <md-card v-for="(q, index) of questions" :key="index">
        <md-card-header class="title">
          <div class="md-title">第{{index + 1}}題</div>
          <div class="md-subhead">(圖/{{q.painter}})</div>
        </md-card-header>
        <md-card-media >
          <div class="img" v-bind:style="{ backgroundImage: 'url(' + 'https://i.imgur.com/'+q.imageUrl + '_d.webp?maxwidth=640&shape=thumb&fidelity=medium' + ')' }"></div>
          <!-- <img class="img" :src="'https://i.imgur.com/'+q.imageUrl + '_d.webp?maxwidth=640&shape=thumb&fidelity=medium'" alt=""> -->
        </md-card-media>

        <md-card-content>
          <div 
            class="md-layout md-gutter">
            <div 
              v-for="o of q.options"
              :key="o.value"
              class="option md-layout-item md-xlarge-size-50 md-large-size-50 md-medium-size-50 md-small-size-50 md-xsmall-size-50">
              <span class="letter">{{ o.letter }}</span>
              <span v-if="showAuthor" class="author">
                <div v-for="(u, ui) of o.users" :key="ui">
                  {{ u }}
                </div>
              </span>
              <span class="value">{{ o.value }}</span>
            </div>
          </div>
        </md-card-content>
      </md-card>
    </md-content>
  </div>

</template>

<script>
import { TemplateGeneratorHelper } from '@/helpers/template-generator-helper'


export default {
    name: 'template-generator',
    data() {
      return {
        // inputs
        userMocksRawInput:`匿名惡魔,杜撰答案001,杜撰答案002,杜撰答案002
匿名嘟嘟,蘋果大人的愛情,杜撰答案002,杜撰答案002
匿名織織,愛情真美好,杜撰答案002,杜撰答案002
匿名皮皮,頭髮少大聯盟,杜撰答案002,杜撰答案002
匿名考克,蘋果大人的愛情,杜撰答案002,杜撰答案002`,
        answersRawInput: `蘋果大人的愛情,蘋果小人的愛情`,
        paintersRawInput: `邪惡的繪師,瘋狂的小畫家`,
        imageUrlsRawInput: `https://imgur.com/bubkkSl,https://imgur.com/xv39IE8`,
        // imageUrlsRawInput: `GhAZsK1,xv39IE8`,
        questions: [],
        showAuthor: false,
      }
    },
    methods: {
      toggle() {
        this.showAuthor = !this.showAuthor
      },
      generate() {
        this.questions = TemplateGeneratorHelper.parseInput(this.userMocksRawInput, this.answersRawInput, this.imageUrlsRawInput,this.paintersRawInput);
      }
    }
}
</script>

<style lang="scss" scoped>
.template-generator {
  padding: 2em;

  .title {
    background-color: #8e7cc3;
    .md-subhead,.md-title {
      font-weight: 700;
      color: black;
    }
  }

  .img {
    width: 100%;
    height: 300px;
    background-position: center center;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .option {
    font-weight: 700;
    text-align: left;
    display: flex;
    line-height: 1.3em;
    font-size: 1.6em;
    .letter,.author {
      padding-right: 3px;
      border-right: dashed 1px;
      margin-right: 3px;
    }
    .letter {
      flex: 0 0 10%;
    }
    .author {
      font-weight: 600;
    }
    .value, .author {
      flex: 1 0 45%;
    }
    &:nth-child(4n-3), &:nth-child(4n) {
      background: #d9d2e9;
    }
    &:nth-child(4n-1), &:nth-child(4n-2) {
      background: #b1a4d3;
    }
  }
}
</style>