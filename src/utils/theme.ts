import { PrismTheme } from 'prism-react-renderer'

const prismDarkAnniTheme: PrismTheme = {
  plain: {
    backgroundColor: 'hsl(0, 0%, 11%)',
    color: 'rgb(255,255,255)',
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
        color: 'hsl(27, 100%, 80%)'
      }
    },
    {
      types: ['variable', 'string', 'char', 'inserted', 'regex', 'attr-value'],
      style: {
        color: 'hsl(164, 100%, 80%)'
      }
    },

    {
      types: ['plain-text', 'plain', 'atrule', 'property', 'imports', 'script'],
      style: {
        color: 'rgb(255,255,255)'
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
const prismLightAnniTheme: PrismTheme = {
  plain: {
    backgroundColor: 'hsl(84, 100%, 98%)',
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
        color: 'hsl(20, 62%, 47%)'
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

export { prismDarkAnniTheme, prismLightAnniTheme }
