import parse from 'html-react-parser'

// 
/**
 *  convertedHtmlToJsx = () => { }
 * 
 *  @param html: 문자열의 html
 *  - convert Html To Jsx
 *  - 예외상황 예측해서 체크할 필요성이 있음.
 */

export const convertedHtmlToJsx = (html: string) => {
    return parse(`${html}`);
}