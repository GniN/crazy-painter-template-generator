<template>
  <div class="template-generator">
    <div class="md-layout">
      <md-field>
          <label>杜撰(格式: 玩家暱稱,杜撰答案1,杜撰答案2)</label>
          <md-textarea v-model="userMocksRawInput" required></md-textarea>
          <span class="md-helper-text"></span>
      </md-field>
      <md-field>
        <label>圖片</label>
        <md-file @change="previewMultiImage" multiple />
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

    <md-button v-if="questions.length > 0" @click="exportImage" class="md-raised md-primary">打包下載</md-button>

    <md-content>
      <md-card v-for="(q, index) of questions" :key="index" :id="'card-'+index">
        <md-card-header class="title">
          <div class="md-title">第{{index + 1}}題</div>
          <div class="md-subhead">(圖/{{q.painter}})</div>
        </md-card-header>
        <md-card-media >
          <img v-if="imageList[index]" :src="imageList[index]" />
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
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

const JSZip = require("jszip");

export default {
    name: 'template-generator',
    data() {
      return {
        // inputs
        userMocksRawInput:`惡魔,杜撰答案001,杜撰答案002,杜撰答案002
嘟嘟,蘋果大人的愛情,杜撰答案002,杜撰答案002
織織,愛情真美好,杜撰答案002,杜撰答案002
皮皮,頭髮少大聯盟,杜撰答案002,杜撰答案002
考克,蘋果大人的愛情,杜撰答案002,杜撰答案002`,
        answersRawInput: `蘋果大人的愛情,蘋果小人的愛情`,
        paintersRawInput: `邪惡的繪師,瘋狂的小畫家`,
        // imageUrlsRawInput: `https://imgur.com/bubkkSl,https://imgur.com/xv39IE8`,
        // imageUrlsRawInput: `GhAZsK1,xv39IE8`,
        imageList: [],
        questions: [],
        showAuthor: false,
      }
    },
    methods: {
      exportImage() {
        const imagePromises = this.questions.map((q, index) => {
          return domtoimage.toBlob(document.getElementById(`card-${index}`))
        })
        
        Promise.all(imagePromises).then((blobs) => {
          var zip = new JSZip();
          blobs.forEach((blob, index) => {
            let filename = `${index+1}.png`
            if (this.showAuthor) filename = `ans_` + filename
            zip.file(filename, blob);
          })
          zip.generateAsync({type:"blob"})
            .then(function(content) {
              saveAs(content, "crazy-painter-images.zip");
            });
        });
      },
      previewMultiImage: function(event) {
        const input = event.target;
        let count = input.files.length;
        let index = 0;
        this.imageList = [];
        if (input.files) {
          while(count --) {
            var reader = new FileReader();
            reader.onload = (e) => {
              this.imageList.push(e.target.result);
            }
            reader.readAsDataURL(input.files[index]);
            index ++;
          }
        }
      },
      toggle() {
        this.showAuthor = !this.showAuthor
      },
      generate() {
        this.questions = TemplateGeneratorHelper.parseInput(this.userMocksRawInput, this.answersRawInput, this.paintersRawInput);
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
      border-right: dashed 1px;
      margin-right: 3px;
    }
    .letter {
      flex: 1 0 30px;
    }
    .author {
      font-weight: 600;
      flex: 1 0 52px;
    }
    .value {
      flex: 1 0 calc(100% - 90px);
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