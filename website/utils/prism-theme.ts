import { PrismTheme } from 'prism-react-renderer'

const prismDarkTheme: PrismTheme = {
  plain: {
    color: '#bbb9aa)',
    textShadow: '0 2px 4px rgba(0, 0, 0,.1)'
  },
  styles: [
    {
      types: ['comment', 'prolog', 'cdata'],
      style: {
        color: 'hsl(0, 0%, 35%)'
      }
    },
    {
      types: [
        'punctuation',
        'attr-name',
        'attr-value',
        'operator',
        'keyword',
        'selector',
        'rule'
      ],
      style: {
        color: 'hsl(30, 3%, 61%)'
      }
    },

    {
      types: [
        'function',
        'tag',
        'important',
        'number',
        'unit',
        'maybe-class-name'
      ],
      style: {
        color: '#dac5b4'
      }
    },
    {
      types: ['variable', 'string', 'char', 'inserted', 'regex', 'attr-value'],
      style: {
        color: '#cafff1'
      }
    },

    {
      types: ['plain-text', 'plain', 'atrule', 'property', 'imports', 'script'],
      style: {
        color: '#bbbab7'
      }
    },

    {
      types: ['deleted'],
      style: {
        textDecorationLine: 'line-through'
      }
    },
    {
      types: ['inserted'],
      style: {
        textDecorationLine: 'underline'
      }
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic'
      }
    },
    {
      types: ['bold'],
      style: {
        fontWeight: 'bold'
      }
    }
  ]
}
const prismLightTheme: PrismTheme = {
  plain: {
    color: 'rgb(0,0,0)'
  },
  styles: [
    {
      types: ['comment', 'prolog', 'cdata'],
      style: {
        color: 'hsl(87, 10%, 83%)'
      }
    },
    {
      types: [
        'punctuation',
        'attr-name',
        'attr-value',
        'operator',
        'keyword',
        'selector',
        'rule'
      ],
      style: {
        color: 'hsl(30, 3%, 61%)'
      }
    },

    {
      types: [
        'function',
        'tag',
        'important',
        'number',
        'unit',
        'maybe-class-name'
      ],
      style: {
        color: '#e3ac52'
      }
    },
    {
      types: ['variable', 'string', 'char', 'inserted', 'regex', 'attr-value'],
      style: {
        color: 'hsl(164, 84%, 44%)'
      }
    },

    {
      types: ['plain-text', 'plain', 'atrule', 'property', 'imports', 'script'],
      style: {
        color: 'rgb(0,0,0)'
      }
    },

    {
      types: ['deleted'],
      style: {
        textDecorationLine: 'line-through'
      }
    },
    {
      types: ['inserted'],
      style: {
        textDecorationLine: 'underline'
      }
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic'
      }
    },
    {
      types: ['bold'],
      style: {
        fontWeight: 'bold'
      }
    }
  ]
}

export { prismDarkTheme, prismLightTheme }
