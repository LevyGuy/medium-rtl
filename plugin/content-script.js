/**
    http://unicode-table.com/en/

    [\u05D0-\u05EA] - Hebrew
    [\u0620-\u063F]|[\u0641-\u064A]|[\u0675-\u06D3] - Arabic
    [\u0710-\u071C]|[\u071E-\u072F] - Syrian
    [\u074E-\u077F] - Arabic Supplement
    [\u08A0-\u08AC]|[\u08AE-\u08B4] - Arabic Extended
    [\u07C1-\u07C9]|[\u07CC-\u07E9] - Thâna
*/
const patt = /[\u05D0-\u05EA]|[\u0620-\u063F]|[\u0641-\u064A]|[\u0675-\u06D3]|[\u0710-\u071C]|[\u071E-\u072F]|[\u074E-\u077F]|[\u08A0-\u08AC]|[\u08AE-\u08B4]|[\u07C1-\u07C9]|[\u07CC-\u07E9]/g;

let run_on_page = () =>
{
    document
        // TODO - optimise this. no need to go over all the elements
        .querySelectorAll('.postArticle-content, section.eh, p, h1, h2, h3, header')
        .forEach(el =>
        {
            if ( !patt.test(el.textContent) ) return;
            el.style.direction = 'rtl';
            el.style.textAlign = 'right';
            el.style.fontFamily = 'sans-serif';

            if (el.nodeName === 'HEADER')
            {
                let avatar = el.querySelector('.avatar');
                if (avatar) avatar.style.marginLeft = '10px';
                let follow = el.querySelector('.followState');
                if (follow) follow.style.marginRight = '10px';
            }
        });

    document
        .querySelectorAll('ol, ul')
        .forEach(el =>
        {
            if ( !patt.test(el.textContent) ) return;
            el.classList.add('rtl');
        })
};

// Add suport for ordered lists
const css = document.createElement('style');
css.type = 'text/css';
css.innerHTML = `
    ol.rtl, ul.rtl,
    .postList.rtl {
        direction: rtl;
        
    }
    ol.rtl>li, ul.rtl>li, .postList.rtl {
        margin-right: 30px;
        margin-left: 0;
    }
    ol.rtl>li:before, ul.rtl>li:before,
    .postList.rtl>li:before {
        margin-left: 0;
        margin-right: -78px;
    }
`;
document.head.appendChild(css);

new MutationObserver(run_on_page)
    .observe(
        document.body,
        {
            childList: true,
            subtree: true
        }
    );
