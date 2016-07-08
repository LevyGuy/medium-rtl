/**
    http://unicode-table.com/en/

    [\u05D0-\u05EA] - Hebrew
    [\u0620-\u063F]|[\u0641-\u064A]|[\u0675-\u06D3] - Arabic
    [\u0710-\u071C]|[\u071E-\u072F] - Syrian
    [\u074E-\u077F] - Arabic Supplement
    [\u08A0-\u08AC]|[\u08AE-\u08B4] - Arabic Extended
    [\u07C1-\u07C9]|[\u07CC-\u07E9] - Thâna
*/
const patt = /[\u05D0-\u05EA]|[\u0620-\u063F]|[\u0641-\u064A]|[\u0675-\u06D3]|[\u0710-\u071C]|[\u071E-\u072F]|[\u074E-\u077F]|[\u08A0-\u08AC]|[\u08AE-\u08B4]|[\u07C1-\u07C9]|[\u07CC-\u07E9]/g

let run_againts_article = (post_article) =>
{
    if (!patt.test(post_article.innerText)) return

    post_article.style.direction = 'rtl'

    // Fonts in Hebrew ususally look much beter on sans-serif
    let paragraphs = post_article.querySelectorAll('p')
    let i = 0, len = paragraphs.length
    for (; i < len; i++) paragraphs[i].style.fontFamily = 'sans-serif'

}

let run_on_page = () =>
{
    let post_articles = document.querySelectorAll('.postArticle-content');
    if (!post_articles.length) return;

    let i = 0, len = post_articles.length
    for (; i < len; i++)
        run_againts_article(post_articles[i])

}

chrome.runtime
    .onMessage
    .addListener(
        (request) =>
        {
            if (request.onUpdated)
                run_on_page()
        });
