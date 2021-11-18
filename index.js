const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()

const url = 'https://www.theguardian.com/uk'

axios(url)
  .then(response => {
    const $ = cheerio.load(response.data);
    const articles = [];
    $('.fc-item__content').each(function () {
      const $this = $(this);
      const title = $this.find('.content__headline').text();
      const date = $this.find('.content__dateline').text();
      const body = $this.find('.content__article-body').text();
      const image = $this.find('.content__standfirst').find('img').attr('src');
      const article = {
        title,
        date,
        body,
        image
      }
      articles.push(article)
    })
//    fs.writeFileSync(path.join(__dirname, 'articles.json'), JSON.stringify(articles))
    console.log(articles)
  })
  .catch(error =>
    console.log(error)
  )

app.listen(8000, () => {
  console.log('Listening on port 8000')
})
