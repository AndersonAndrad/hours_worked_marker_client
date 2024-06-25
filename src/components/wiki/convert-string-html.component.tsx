import DOMPurify from 'dompurify';

interface ConvertStringToHTMLProps {
  str: string;
}

type TransformRule = {
  regex: RegExp;
  replacement: string;
};

const rules: TransformRule[] = [
  {
    regex: /__(.*?)__/g,
    replacement: '<i>$1</i>',
  },
];

const convertStringToHtml = (str: string) => {
  let htmlString = str;

  rules.forEach(({ regex, replacement }) => {
    htmlString = htmlString.replace(regex, replacement);
  });

  return htmlString;
};

export function ConvertStringToHTML({ str }: ConvertStringToHTMLProps) {
  const htmlString = convertStringToHtml(str);

  console.log(htmlString);
  const sanitizedHtmlString = DOMPurify.sanitize(htmlString);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtmlString }} />;
}
