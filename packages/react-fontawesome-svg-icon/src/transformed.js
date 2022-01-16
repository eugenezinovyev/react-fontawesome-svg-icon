/* eslint-disable */
/*!
 * Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 */

const noop = () => {};

let _WINDOW = {};
let _DOCUMENT = {};
let _MUTATION_OBSERVER = null;
let _PERFORMANCE = { mark: noop, measure: noop };

try {
    if (typeof window !== 'undefined') _WINDOW = window;
    if (typeof document !== 'undefined') _DOCUMENT = document;
    if (typeof MutationObserver !== 'undefined') _MUTATION_OBSERVER = MutationObserver;
    if (typeof performance !== 'undefined') _PERFORMANCE = performance;
} catch (e) {}

const userAgent = (_WINDOW.navigator || {}).userAgent ?? '';
const WINDOW = _WINDOW;
const DOCUMENT = _DOCUMENT;
const MUTATION_OBSERVER = _MUTATION_OBSERVER;
const PERFORMANCE = _PERFORMANCE;
const IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === 'function' && typeof DOCUMENT.createElement === 'function';
const IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');

const NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';
const UNITS_IN_GRID = 16;
const DEFAULT_FAMILY_PREFIX = 'fa';
const DEFAULT_REPLACEMENT_CLASS = 'svg-inline--fa';
const DATA_FA_I2SVG = 'data-fa-i2svg';
const DATA_FA_PSEUDO_ELEMENT = 'data-fa-pseudo-element';
const DATA_FA_PSEUDO_ELEMENT_PENDING = 'data-fa-pseudo-element-pending';
const DATA_PREFIX = 'data-prefix';
const DATA_ICON = 'data-icon';
const HTML_CLASS_I2SVG_BASE_CLASS = 'fontawesome-i2svg';
const MUTATION_APPROACH_ASYNC = 'async';
const TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS = ['HTML', 'HEAD', 'STYLE', 'SCRIPT'];
const PRODUCTION = function () {
    try {
        return process.env.NODE_ENV === 'production';
    } catch (e) {
        return false;
    }
}();
const PREFIX_TO_STYLE = { 'fas': 'solid', 'far': 'regular', 'fal': 'light', 'fad': 'duotone', 'fab': 'brands', 'fak': 'kit', 'fa': 'solid' };
const STYLE_TO_PREFIX = { 'solid': 'fas', 'regular': 'far', 'light': 'fal', 'duotone': 'fad', 'brands': 'fab', 'kit': 'fak' };
const LAYERS_TEXT_CLASSNAME = 'fa-layers-text';
const FONT_FAMILY_PATTERN = /Font Awesome ([5 ]*)(Solid|Regular|Light|Duotone|Brands|Free|Pro|Kit).*/i; // TODO: do we need to handle font-weight for kit SVG pseudo-elements?

const FONT_WEIGHT_TO_PREFIX = { '900': 'fas', '400': 'far', 'normal': 'far', '300': 'fal' };
const oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const oneToTwenty = oneToTen.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
const ATTRIBUTES_WATCHED_FOR_MUTATION = ['class', 'data-prefix', 'data-icon', 'data-fa-transform', 'data-fa-mask'];
const DUOTONE_CLASSES = { GROUP: 'group', SWAP_OPACITY: 'swap-opacity', PRIMARY: 'primary', SECONDARY: 'secondary' };
const RESERVED_CLASSES = [
    'xs',
    'sm',
    'lg',
    'fw',
    'ul',
    'li',
    'border',
    'pull-left',
    'pull-right',
    'spin',
    'pulse',
    'rotate-90',
    'rotate-180',
    'rotate-270',
    'flip-horizontal',
    'flip-vertical',
    'flip-both',
    'stack',
    'stack-1x',
    'stack-2x',
    'inverse',
    'layers',
    'layers-text',
    'layers-counter',
    DUOTONE_CLASSES.GROUP,
    DUOTONE_CLASSES.SWAP_OPACITY,
    DUOTONE_CLASSES.PRIMARY,
    DUOTONE_CLASSES.SECONDARY,
    ...oneToTen.map(n => `${n}x`),
    ...oneToTwenty.map(n => `w-${n}`),
];

const initial = WINDOW.FontAwesomeConfig || {};

function getAttrConfig(attr) {
    const element = DOCUMENT.querySelector('script[' + attr + ']');

    return element && element.getAttribute(attr);
}

function coerce(val) {
    // Getting an empty string will occur if the attribute is set on the HTML tag but without a value
    // We'll assume that this is an indication that it should be toggled to true
    // For example <script data-search-pseudo-elements src="..."></script>
    if (val === '') return true;
    if (val === 'false') return false;
    if (val === 'true') return true;
    return val;
}

if (DOCUMENT && typeof DOCUMENT.querySelector === 'function') {
    const attrs = [
        ['data-family-prefix', 'familyPrefix'],
        ['data-replacement-class', 'replacementClass'],
        ['data-auto-replace-svg', 'autoReplaceSvg'],
        ['data-auto-add-css', 'autoAddCss'],
        ['data-auto-a11y', 'autoA11y'],
        ['data-search-pseudo-elements', 'searchPseudoElements'],
        ['data-observe-mutations', 'observeMutations'],
        ['data-mutate-approach', 'mutateApproach'],
        ['data-keep-original-source', 'keepOriginalSource'],
        ['data-measure-performance', 'measurePerformance'],
        ['data-show-missing-icons', 'showMissingIcons']
    ];

    attrs.forEach(function ([attr, key]) {
        const val = coerce(getAttrConfig(attr));

        if (val !== undefined && val !== null) {
            initial[key] = val;
        }
    });
}

const _config = {
    familyPrefix: DEFAULT_FAMILY_PREFIX,
    replacementClass: DEFAULT_REPLACEMENT_CLASS,
    autoReplaceSvg: true,
    autoAddCss: true,
    autoA11y: true,
    searchPseudoElements: false,
    observeMutations: true,
    mutateApproach: 'async',
    keepOriginalSource: true,
    measurePerformance: false,
    showMissingIcons: true,
    ...initial
};

if (!_config.autoReplaceSvg) _config.observeMutations = false;

const config = { ..._config };

WINDOW.FontAwesomeConfig = config;

const w = WINDOW || {};
if (!w[NAMESPACE_IDENTIFIER]) w[NAMESPACE_IDENTIFIER] = {};
if (!w[NAMESPACE_IDENTIFIER].styles) w[NAMESPACE_IDENTIFIER].styles = {};
if (!w[NAMESPACE_IDENTIFIER].hooks) w[NAMESPACE_IDENTIFIER].hooks = {};
if (!w[NAMESPACE_IDENTIFIER].shims) w[NAMESPACE_IDENTIFIER].shims = [];
const namespace = w[NAMESPACE_IDENTIFIER];

const functions = [];
let loaded = false;

const listener = function listener() {
    DOCUMENT.removeEventListener('DOMContentLoaded', listener);
    loaded = true;
    functions.map(fn => fn());
};

if (IS_DOM) {
    loaded = (DOCUMENT.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(DOCUMENT.readyState);
    if (!loaded) DOCUMENT.addEventListener('DOMContentLoaded', listener);
}

function domready (fn) {
    if (!IS_DOM) return;
    loaded ? setTimeout(fn, 0) : functions.push(fn);
}

const d = UNITS_IN_GRID;
const meaninglessTransform = {
    size: 16,
    x: 0,
    y: 0,
    rotate: 0,
    flipX: false,
    flipY: false
};

function isReserved(name) {
    return ~RESERVED_CLASSES.indexOf(name);
}
function insertCss(css) {
    if (!css || !IS_DOM) {
        return;
    }

    const style = DOCUMENT.createElement('style');
    style.setAttribute('type', 'text/css');
    style.innerHTML = css;
    const headChildren = DOCUMENT.head.childNodes;
    let beforeChild = null;

    for (let i = headChildren.length - 1; i > -1; i--) {
        const child = headChildren[i];
        const tagName = (child.tagName || '').toUpperCase();

        if (['STYLE', 'LINK'].indexOf(tagName) > -1) {
            beforeChild = child;
        }
    }

    DOCUMENT.head.insertBefore(style, beforeChild);
    return css;
}

const idPool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function nextUniqueId() {
    let size = 12;
    let id = '';

    while (size-- > 0) {
        id += idPool[Math.random() * 62 | 0];
    }

    return id;
}
function toArray(obj) {
    const array = [];

    for (let i = (obj || []).length >>> 0; i--;) {
        array[i] = obj[i];
    }

    return array;
}
function classArray(node) {
    if (node.classList) {
        return toArray(node.classList);
    } else {
        return (node.getAttribute('class') || '').split(' ').filter(function (i) {
            return i;
        });
    }
}

function getIconName(familyPrefix, cls) {
    const parts = cls.split('-');
    const prefix = parts[0];
    const iconName = parts.slice(1).join('-');

    if (prefix === familyPrefix && iconName !== '' && !isReserved(iconName)) {
        return iconName;
    } else {
        return null;
    }
}

const htmlEscape = str => ("" + str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const joinAttributes = attributes => Object.keys(attributes || {})
    .reduce((acc, attributeName) => acc + `${attributeName}="${htmlEscape(attributes[attributeName])}" `, '')
    .trim();

const joinStyles = styles => Object.keys(styles || {}).reduce((acc, styleName) => acc + `${styleName}: ${styles[styleName]};`, '');

const transformIsMeaningful = transform => transform.size !== meaninglessTransform.size ||
                                           transform.x !== meaninglessTransform.x ||
                                           transform.y !== meaninglessTransform.y ||
                                           transform.rotate !== meaninglessTransform.rotate ||
                                           transform.flipX ||
                                           transform.flipY;

const transformForSvg = ({ transform: { flipX, flipY, rotate, size, x, y }, containerWidth, iconWidth }) => ({
    outer: { transform: `translate(${containerWidth / 2} 256)` },
    inner: {
        transform: `translate(${x * 32}, ${y * 32}) scale(${size / 16 * (flipX ? -1 : 1)}, ${size / 16 * (flipY ? -1 : 1)}) rotate(${rotate} 0 0)`,
    },
    path: { transform: `translate(${iconWidth / 2 * -1} -256)` }
});

function transformForCss({ transform: { flipX, flipY, rotate, size, x, y }, width = UNITS_IN_GRID, height = UNITS_IN_GRID, startCentered = false }) {
    let translate;

    if (startCentered && IS_IE) {
        translate = `translate(${x / d - width / 2}em, ${y / d - height / 2}em)`;
    } else if (startCentered) {
        translate = `translate(calc(-50% + ${x / d}em), calc(-50% + ${y / d}em))`;
    } else {
        translate = `translate(${x / d}em, ${y / d}em)`;
    }

    return `${translate} scale(${size / d * (flipX ? -1 : 1)}, ${size / d * (flipY ? -1 : 1)}) rotate(${rotate}deg)`;
}

const ALL_SPACE = { x: 0, y: 0, width: '100%', height: '100%' };

function fillBlack(abstract, force = true) {
    if (abstract.attributes && (abstract.attributes.fill || force)) {
        abstract.attributes.fill = 'black';
    }

    return abstract;
}

const deGroup = abstract => abstract.tag === 'g' ? abstract.children : [ abstract ];

function makeIconMasking({
                             children,
                             attributes,
                             main: { width: mainWidth, icon: mainPath },
                             mask: { width: maskWidth, icon: maskPath },
                             maskId: explicitMaskId,
                             transform
}) {
    const trans = transformForSvg({ transform: transform, containerWidth: maskWidth, iconWidth: mainWidth });
    const maskInnerGroupChildrenMixin = mainPath.children ? { children: mainPath.children.map(fillBlack) } : {};
    const maskId = `mask-${explicitMaskId || nextUniqueId()}`;
    const clipId = `clip-${explicitMaskId || nextUniqueId()}`;

    children.push({
        tag: 'defs',
        children: [
            {
                tag: 'clipPath',
                attributes: { id: clipId },
                children: deGroup(maskPath)
            },
            {
                tag: 'mask',
                attributes: { ...ALL_SPACE, id: maskId, maskUnits: 'userSpaceOnUse', maskContentUnits: 'userSpaceOnUse' },
                children: [
                    {
                        tag: 'rect',
                        attributes: { ...ALL_SPACE, fill: 'white' },
                    },
                    {
                        tag: 'g',
                        attributes: { ...trans.outer },
                        children: [
                            {
                                tag: 'g',
                                attributes: { ...trans.inner },
                                children: [
                                    fillBlack({
                                        tag: mainPath.tag,
                                        attributes: { ...mainPath.attributes, ...trans.path }, ...maskInnerGroupChildrenMixin
                                    })
                                ],
                            }
                        ],
                    }
                ]
            }
        ]
    }, {
        tag: 'rect',
        attributes: {
            fill: 'currentColor',
            'clip-path': `url(#${clipId})`,
            mask: `url(#${maskId})`,
            ...ALL_SPACE,
        },
    });

    return {
        children: children,
        attributes: attributes
    };
}

function makeIconStandard({ children, attributes, main, transform, styles }) {
    const styleString = joinStyles(styles);

    if (styleString.length > 0) {
        attributes.style = styleString;
    }

    if (transformIsMeaningful(transform)) {
        const trans = transformForSvg({ transform: transform, containerWidth: main.width, iconWidth: main.width });

        children.push({
            tag: 'g',
            attributes: { ...trans.outer },
            children: [
                {
                    tag: 'g',
                    attributes: { ...trans.inner },
                    children: [
                        {
                            tag: main.icon.tag,
                            children: main.icon.children,
                            attributes: { ...main.icon.attributes, ...trans.path },
                        }
                    ]
                }
            ]
        });
    } else {
        children.push(main.icon);
    }

    return {
        children: children,
        attributes: attributes
    };
}

const asIcon = ({ children, main, mask, attributes, styles, transform }) => {
    if (transformIsMeaningful(transform) && main.found && !mask.found) {
        const { width, height } = main;
        const offset = { x: width / height / 2, y: 0.5 };

        attributes.style = joinStyles({
            ...styles,
            'transform-origin': `${offset.x + transform.x / 16}em ${offset.y + transform.y / 16}em`,
        });
    }

    return [
        {
            tag: 'svg',
            attributes: attributes,
            children: children
        }
    ];
};

const asSymbol = ({ prefix, iconName, children, attributes, symbol }) => [
    {
        tag: 'svg',
        attributes: { style: 'display: none;' },
        children: [
            {
                tag: 'symbol',
                attributes: { ...attributes, id: symbol === true ? `${prefix}-${config.familyPrefix}-${iconName}` : symbol },
                children: children
            }
        ]
    }
];

function makeInlineSvgAbstract({ icons: { main, mask }, prefix, iconName, transform, symbol, title, maskId, titleId, extra, watchable = false }) {
    const { width, height } = mask.found ? mask : main;
    const isUploadedIcon = prefix === 'fak';
    const content = {
        children: [],
        attributes: {
            ...extra.attributes,
            'data-prefix': prefix,
            'data-icon': iconName,
            'class': [
                config.replacementClass,
                iconName ? `${config.familyPrefix}-${iconName}` : '',
                isUploadedIcon ? '' : `fa-w-${Math.ceil(width / height * 16)}`
            ].filter(c => !extra.classes.includes(c)).filter(Boolean).concat(extra.classes).join(' '),
            'role': extra.attributes.role || 'img',
            'xmlns': 'http://www.w3.org/2000/svg',
            'viewBox': `0 0 ${width} ${height}`,
        }
    };
    const uploadedIconWidthStyle = isUploadedIcon && !extra.classes.includes('fa-fw') ? { width: `${width / height * 16 * 0.0625}em` } : {};

    if (watchable) {
        content.attributes[DATA_FA_I2SVG] = '';
    }

    if (title) {
        content.children.push({
            tag: 'title',
            attributes: { id: content.attributes['aria-labelledby'] || `title-${titleId || nextUniqueId()}` },
            children: [title]
        });
    }

    const args = {
        ...content,
        prefix: prefix,
        iconName: iconName,
        main: main,
        mask: mask,
        maskId: maskId,
        transform: transform,
        symbol: symbol,
        styles: { ...uploadedIconWidthStyle, ...extra.styles },
    };

    const { children, attributes } = mask.found && main.found ? makeIconMasking(args) : makeIconStandard(args);

    args.children = children;
    args.attributes = attributes;

    if (symbol) {        
        return asSymbol(args);
    } else {        
        return asIcon(args);
    }
}

function makeLayersTextAbstract(params) {
    const content = params.content,
        width = params.width,
        height = params.height,
        transform = params.transform,
        title = params.title,
        extra = params.extra,
        _params$watchable2 = params.watchable,
        watchable = _params$watchable2 === void 0 ? false : _params$watchable2;

    const attributes = {
        ...extra.attributes,
        ...(title ? { 'title': title } : {}),
        'class': extra.classes.join(' '),
    };

    if (watchable) {
        attributes[DATA_FA_I2SVG] = '';
    }

    const styles = { ...extra.styles };

    if (transformIsMeaningful(transform)) {
        styles['transform'] = transformForCss({
            transform: transform,
            startCentered: true,
            width: width,
            height: height
        });
        styles['-webkit-transform'] = styles['transform'];
    }

    const styleString = joinStyles(styles);

    if (styleString.length > 0) {
        attributes['style'] = styleString;
    }

    const val = [];
    val.push({
        tag: 'span',
        attributes: attributes,
        children: [content]
    });

    if (title) {
        val.push({
            tag: 'span',
            attributes: {
                class: 'sr-only'
            },
            children: [title]
        });
    }

    return val;
}

function makeLayersCounterAbstract({ content, title, extra }) {
    const attributes = {
        ...extra.attributes,
        ...(title ? { 'title': title } : {}),
        'class': extra.classes.join(' '),
    };

    const styleString = joinStyles(extra.styles);

    if (styleString.length > 0) {
        attributes['style'] = styleString;
    }

    const val = [
        {
            tag: 'span',
            attributes: attributes,
            children: [ content ]
        }
    ];

    if (title) {
        val.push({
            tag: 'span',
            attributes: { class: 'sr-only' },
            children: [title]
        });
    }

    return val;
}

const noop$1 = function noop() {
};

const p = config.measurePerformance && PERFORMANCE && PERFORMANCE.mark && PERFORMANCE.measure ? PERFORMANCE : {
    mark: noop$1,
    measure: noop$1
};
const preamble = "FA \"5.15.4\"";

const begin = name => {
    p.mark(`${preamble} ${name} begins`);

    return () => end(name);
};

const end = name => {
    p.mark(`${preamble} ${name} ends`);
    p.measure(`${preamble} ${name}`, `${preamble} ${name} begins`, `${preamble} ${name} ends`);
};

const perf = {
    begin: begin,
    end: end
};

/**
 * Internal helper to bind a function known to have 4 arguments
 * to a given context.
 */
const bindInternal4 = function bindInternal4(func, thisContext) {
    return function (a, b, c, d) {
        return func.call(thisContext, a, b, c, d);
    };
};

/**
 * # Reduce
 *
 * A fast object `.reduce()` implementation.
 *
 * @param  {Object}   subject      The object to reduce over.
 * @param  {Function} fn           The reducer function.
 * @param  {unknown}    initialValue The initial value for the reducer, defaults to subject[0].
 * @param  {Object}   thisContext  The context for the reducer.
 * @return {unknown}                 The final result.
 */
const reduce = function fastReduceObject(subject, fn, initialValue, thisContext) {
    const keys = Object.keys(subject),
        length = keys.length,
        iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn;
    let i,
        key,
        result;

    if (initialValue === undefined) {
        i = 1;
        result = subject[keys[0]];
    } else {
        i = 0;
        result = initialValue;
    }

    for (; i < length; i++) {
        key = keys[i];
        result = iterator(result, subject[key], key, subject);
    }

    return result;
};

function toHex(unicode) {
    let result = '';

    for (let i = 0; i < unicode.length; i++) {
        const hex = unicode.charCodeAt(i).toString(16);
        result += ('000' + hex).slice(-4);
    }

    return result;
}

function defineIcons(prefix, icons) {
    const params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const _params$skipHooks = params.skipHooks,
        skipHooks = _params$skipHooks === void 0 ? false : _params$skipHooks;
    const normalized = Object.keys(icons).reduce(function (acc, iconName) {
        const icon = icons[iconName];
        const expanded = !!icon.icon;

        if (expanded) {
            acc[icon.iconName] = icon.icon;
        } else {
            acc[iconName] = icon;
        }

        return acc;
    }, {});

    if (typeof namespace.hooks.addPack === 'function' && !skipHooks) {
        namespace.hooks.addPack(prefix, normalized);
    } else {
        namespace.styles[prefix] = { ...(namespace.styles[prefix] || {}), ...normalized };
    }
    /**
     * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction
     * of new styles we needed to differentiate between them. Prefix `fa` is now an alias
     * for `fas` so we'll easy the upgrade process for our users by automatically defining
     * this as well.
     */


    if (prefix === 'fas') {
        defineIcons('fa', icons);
    }
}

var styles = namespace.styles,
    shims = namespace.shims;
let _byUnicode = {};
let _byLigature = {};
let _byOldName = {};
const build = function build() {
    const lookup = function lookup(reducer) {
        return reduce(styles, function (o, style, prefix) {
            o[prefix] = reduce(style, reducer, {});
            return o;
        }, {});
    };

    _byUnicode = lookup(function (acc, icon, iconName) {
        if (icon[3]) {
            acc[icon[3]] = iconName;
        }

        return acc;
    });
    _byLigature = lookup(function (acc, icon, iconName) {
        const ligatures = icon[2];
        acc[iconName] = iconName;
        ligatures.forEach(function (ligature) {
            acc[ligature] = iconName;
        });
        return acc;
    });
    const hasRegular = 'far' in styles;
    _byOldName = reduce(shims, function (acc, shim) {
        const oldName = shim[0];
        let prefix = shim[1];
        const iconName = shim[2];

        if (prefix === 'far' && !hasRegular) {
            prefix = 'fas';
        }

        acc[oldName] = {
            prefix: prefix,
            iconName: iconName
        };
        return acc;
    }, {});
};
build();
function byUnicode(prefix, unicode) {
    return (_byUnicode[prefix] || {})[unicode];
}
function byLigature(prefix, ligature) {
    return (_byLigature[prefix] || {})[ligature];
}
function byOldName(name) {
    return _byOldName[name] || {
        prefix: null,
        iconName: null
    };
}

const styles$1 = namespace.styles;
const emptyCanonicalIcon = function emptyCanonicalIcon() {
    return {
        prefix: null,
        iconName: null,
        rest: []
    };
};

function getCanonicalIcon(values) {
    return values.reduce(function (acc, cls) {
        const iconName = getIconName(config.familyPrefix, cls);

        if (styles$1[cls]) {
            acc.prefix = cls;
        } else if (config.autoFetchSvg && Object.keys(PREFIX_TO_STYLE).indexOf(cls) > -1) {
            acc.prefix = cls;
        } else if (iconName) {
            const shim = acc.prefix === 'fa' ? byOldName(iconName) : {};
            acc.iconName = shim.iconName || iconName;
            acc.prefix = shim.prefix || acc.prefix;
        } else if (cls !== config.replacementClass && cls.indexOf('fa-w-') !== 0) {
            acc.rest.push(cls);
        }

        return acc;
    }, emptyCanonicalIcon());
}
function iconFromMapping(mapping, prefix, iconName) {
    if (mapping && mapping[prefix] && mapping[prefix][iconName]) {
        return {
            prefix: prefix,
            iconName: iconName,
            icon: mapping[prefix][iconName]
        };
    }
}

function toHtml(abstractNodes) {
    const tag = abstractNodes.tag,
        _abstractNodes$attrib = abstractNodes.attributes,
        attributes = _abstractNodes$attrib === void 0 ? {} : _abstractNodes$attrib,
        _abstractNodes$childr = abstractNodes.children,
        children = _abstractNodes$childr === void 0 ? [] : _abstractNodes$childr;

    if (typeof abstractNodes === 'string') {
        return htmlEscape(abstractNodes);
    } else {
        return "<".concat(tag, " ").concat(joinAttributes(attributes), ">").concat(children.map(toHtml).join(''), "</").concat(tag, ">");
    }
}

const noop$2 = function noop() {
};

function isWatched(node) {
    const i2svg = node.getAttribute ? node.getAttribute(DATA_FA_I2SVG) : null;
    return typeof i2svg === 'string';
}

function getMutator() {
    if (config.autoReplaceSvg === true) {
        return mutators.replace;
    }

    const mutator = mutators[config.autoReplaceSvg];
    return mutator || mutators.replace;
}

var mutators = {
    replace: function replace(mutation) {
        const node = mutation[0];
        const abstract = mutation[1];
        const newOuterHTML = abstract.map(function (a) {
            return toHtml(a);
        }).join('\n');

        if (node.parentNode && node.outerHTML) {
            node.outerHTML = newOuterHTML + (config.keepOriginalSource && node.tagName.toLowerCase() !== 'svg' ? "<!-- ".concat(node.outerHTML, " Font Awesome fontawesome.com -->") : '');
        } else if (node.parentNode) {
            const newNode = document.createElement('span');
            node.parentNode.replaceChild(newNode, node);
            newNode.outerHTML = newOuterHTML;
        }
    },
    nest: function nest(mutation) {
        const node = mutation[0];
        const abstract = mutation[1]; // If we already have a replaced node we do not want to continue nesting within it.
        // Short-circuit to the standard replacement

        if (~classArray(node).indexOf(config.replacementClass)) {
            return mutators.replace(mutation);
        }

        const forSvg = new RegExp("".concat(config.familyPrefix, "-.*"));
        delete abstract[0].attributes.style;
        delete abstract[0].attributes.id;
        const splitClasses = abstract[0].attributes.class.split(' ').reduce(function (acc, cls) {
            if (cls === config.replacementClass || cls.match(forSvg)) {
                acc.toSvg.push(cls);
            } else {
                acc.toNode.push(cls);
            }

            return acc;
        }, {
            toNode: [],
            toSvg: []
        });
        abstract[0].attributes.class = splitClasses.toSvg.join(' ');
        const newInnerHTML = abstract.map(function (a) {
            return toHtml(a);
        }).join('\n');
        node.setAttribute('class', splitClasses.toNode.join(' '));
        node.setAttribute(DATA_FA_I2SVG, '');
        node.innerHTML = newInnerHTML;
    }
};

function performOperationSync(op) {
    op();
}

function perform(mutations, callback) {
    const callbackFunction = typeof callback === 'function' ? callback : noop$2;

    if (mutations.length === 0) {
        callbackFunction();
    } else {
        let frame = performOperationSync;

        if (config.mutateApproach === MUTATION_APPROACH_ASYNC) {
            frame = WINDOW.requestAnimationFrame || performOperationSync;
        }

        frame(function () {
            const mutator = getMutator();
            const mark = perf.begin('mutate');
            mutations.map(mutator);
            mark();
            callbackFunction();
        });
    }
}

let disabled = false;

function disableObservation() {
    disabled = true;
}
function enableObservation() {
    disabled = false;
}

let mo = null;

function observe(options) {
    if (!MUTATION_OBSERVER) {
        return;
    }

    if (!config.observeMutations) {
        return;
    }

    const treeCallback = options.treeCallback,
        nodeCallback = options.nodeCallback,
        pseudoElementsCallback = options.pseudoElementsCallback,
        _options$observeMutat = options.observeMutationsRoot,
        observeMutationsRoot = _options$observeMutat === void 0 ? DOCUMENT : _options$observeMutat;
    mo = new MUTATION_OBSERVER(function (objects) {
        if (disabled) return;
        toArray(objects).forEach(function (mutationRecord) {
            if (mutationRecord.type === 'childList' && mutationRecord.addedNodes.length > 0 && !isWatched(mutationRecord.addedNodes[0])) {
                if (config.searchPseudoElements) {
                    pseudoElementsCallback(mutationRecord.target);
                }

                treeCallback(mutationRecord.target);
            }

            if (mutationRecord.type === 'attributes' && mutationRecord.target.parentNode && config.searchPseudoElements) {
                pseudoElementsCallback(mutationRecord.target.parentNode);
            }

            if (mutationRecord.type === 'attributes' && isWatched(mutationRecord.target) && ~ATTRIBUTES_WATCHED_FOR_MUTATION.indexOf(mutationRecord.attributeName)) {
                if (mutationRecord.attributeName === 'class') {
                    const _getCanonicalIcon = getCanonicalIcon(classArray(mutationRecord.target)),
                        prefix = _getCanonicalIcon.prefix,
                        iconName = _getCanonicalIcon.iconName;

                    if (prefix) mutationRecord.target.setAttribute('data-prefix', prefix);
                    if (iconName) mutationRecord.target.setAttribute('data-icon', iconName);
                } else {
                    nodeCallback(mutationRecord.target);
                }
            }
        });
    });
    if (!IS_DOM) return;
    mo.observe(observeMutationsRoot, {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true
    });
}
function disconnect() {
    if (!mo) return;
    mo.disconnect();
}

function styleParser (node) {
    const style = node.getAttribute('style');
    let val = [];

    if (style) {
        val = style.split(';').reduce(function (acc, style) {
            const styles = style.split(':');
            const prop = styles[0];
            const value = styles.slice(1);

            if (prop && value.length > 0) {
                acc[prop] = value.join(':').trim();
            }

            return acc;
        }, {});
    }

    return val;
}

function classParser (node) {
    const existingPrefix = node.getAttribute('data-prefix');
    const existingIconName = node.getAttribute('data-icon');
    const innerText = node.innerText !== undefined ? node.innerText.trim() : '';
    const val = getCanonicalIcon(classArray(node));

    if (existingPrefix && existingIconName) {
        val.prefix = existingPrefix;
        val.iconName = existingIconName;
    }

    if (val.prefix && innerText.length > 1) {
        val.iconName = byLigature(val.prefix, node.innerText);
    } else if (val.prefix && innerText.length === 1) {
        val.iconName = byUnicode(val.prefix, toHex(node.innerText));
    }

    return val;
}

const parseTransformString = function parseTransformString(transformString) {
    const transform = {
        size: 16,
        x: 0,
        y: 0,
        flipX: false,
        flipY: false,
        rotate: 0
    };

    if (!transformString) {
        return transform;
    } else {
        return transformString.toLowerCase().split(' ').reduce(function (acc, n) {
            const parts = n.toLowerCase().split('-');
            const first = parts[0];
            let rest = parts.slice(1).join('-');

            if (first && rest === 'h') {
                acc.flipX = true;
                return acc;
            }

            if (first && rest === 'v') {
                acc.flipY = true;
                return acc;
            }

            rest = parseFloat(rest);

            if (isNaN(rest)) {
                return acc;
            }

            switch (first) {
                case 'grow':
                    acc.size = acc.size + rest;
                    break;

                case 'shrink':
                    acc.size = acc.size - rest;
                    break;

                case 'left':
                    acc.x = acc.x - rest;
                    break;

                case 'right':
                    acc.x = acc.x + rest;
                    break;

                case 'up':
                    acc.y = acc.y - rest;
                    break;

                case 'down':
                    acc.y = acc.y + rest;
                    break;

                case 'rotate':
                    acc.rotate = acc.rotate + rest;
                    break;
            }

            return acc;
        }, transform);
    }
};

function transformParser (node) {
    return parseTransformString(node.getAttribute('data-fa-transform'));
}

function symbolParser (node) {
    const symbol = node.getAttribute('data-fa-symbol');
    return symbol === null ? false : symbol === '' ? true : symbol;
}

function attributesParser (node) {
    const extraAttributes = toArray(node.attributes).reduce(function (acc, attr) {
        if (acc.name !== 'class' && acc.name !== 'style') {
            acc[attr.name] = attr.value;
        }

        return acc;
    }, {});
    const title = node.getAttribute('title');
    const titleId = node.getAttribute('data-fa-title-id');

    if (config.autoA11y) {
        if (title) {
            extraAttributes['aria-labelledby'] = "".concat(config.replacementClass, "-title-").concat(titleId || nextUniqueId());
        } else {
            extraAttributes['aria-hidden'] = 'true';
            extraAttributes['focusable'] = 'false';
        }
    }

    return extraAttributes;
}

function maskParser (node) {
    const mask = node.getAttribute('data-fa-mask');

    if (!mask) {
        return emptyCanonicalIcon();
    } else {
        return getCanonicalIcon(mask.split(' ').map(function (i) {
            return i.trim();
        }));
    }
}

function blankMeta() {
    return {
        iconName: null,
        title: null,
        titleId: null,
        prefix: null,
        transform: meaninglessTransform,
        symbol: false,
        mask: null,
        maskId: null,
        extra: {
            classes: [],
            styles: {},
            attributes: {}
        }
    };
}
function parseMeta(node) {
    const _classParser = classParser(node),
        iconName = _classParser.iconName,
        prefix = _classParser.prefix,
        extraClasses = _classParser.rest;

    const extraStyles = styleParser(node);
    const transform = transformParser(node);
    const symbol = symbolParser(node);
    const extraAttributes = attributesParser(node);
    const mask = maskParser(node);
    return {
        iconName: iconName,
        title: node.getAttribute('title'),
        titleId: node.getAttribute('data-fa-title-id'),
        prefix: prefix,
        transform: transform,
        symbol: symbol,
        mask: mask,
        maskId: node.getAttribute('data-fa-mask-id'),
        extra: {
            classes: extraClasses,
            styles: extraStyles,
            attributes: extraAttributes
        }
    };
}

function MissingIcon(error) {
    this.name = 'MissingIcon';
    this.message = error || 'Icon unavailable';
    this.stack = new Error().stack;
}
MissingIcon.prototype = Object.create(Error.prototype);
MissingIcon.prototype.constructor = MissingIcon;

const FILL = {
    fill: 'currentColor'
};

const ANIMATION_BASE = {
    attributeType: 'XML',
    repeatCount: 'indefinite',
    dur: '2s'
};

const RING = {
    tag: 'path',
    attributes: {
        ...FILL,
        d: 'M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z'
    },
};

const OPACITY_ANIMATE = { ...ANIMATION_BASE, attributeName: 'opacity' };

const DOT = {
    tag: 'circle',
    attributes: { ...FILL, cx: '256', cy: '364', r: '28' },
    children: [
        {
            tag: 'animate',
            attributes: { ...ANIMATION_BASE, attributeName: 'r', values: '28;14;28;28;14;28;' },
        },
        {
            tag: 'animate',
            attributes: { ...OPACITY_ANIMATE, values: '1;0;1;1;0;1;' },
        }
    ]
};

const QUESTION = {
    tag: 'path',
    attributes: {
        ...FILL,
        opacity: '1',
        d: 'M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z'
    },
    children: [
        {
            tag: 'animate',
            attributes: {
                ...OPACITY_ANIMATE,
                values: '1;0;0;0;0;1;'
            }
        }
    ]
};

const EXCLAMATION = {
    tag: 'path',
    attributes: {
        ...FILL,
        opacity: '0',
        d: 'M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z'
    },
    children: [
        {
            tag: 'animate',
            attributes: {
                ...OPACITY_ANIMATE,
                values: '0;0;1;1;0;0;'
            }
        }
    ]
};

const missing = { tag: 'g', children: [RING, DOT, QUESTION, EXCLAMATION] };
const asFoundIcon = ([ width, height, , , vectorData ]) => ({
    found: true,
    width: width,
    height: height,
    icon: Array.isArray(vectorData)
        ? {
            tag: 'g',
            attributes: { class: `${config.familyPrefix}-${DUOTONE_CLASSES.GROUP}` },
            children: [
                {
                    tag: 'path',
                    attributes: { class: `${config.familyPrefix}-${DUOTONE_CLASSES.SECONDARY}`, fill: 'currentColor', d: vectorData[0] }
                },
                {
                    tag: 'path',
                    attributes: { class: `${config.familyPrefix}-${DUOTONE_CLASSES.PRIMARY}`, fill: 'currentColor', d: vectorData[1] }
                }
            ]
        }
        : {
            tag: 'path',
            attributes: { fill: 'currentColor', d: vectorData }
        }
});

function findIcon(iconName, prefix) {
    return new Promise(function (resolve, reject) {
        if (iconName && prefix && (namespace.styles)[prefix] && (namespace.styles)[prefix][iconName]) {
            const icon = (namespace.styles)[prefix][iconName];
            return resolve(asFoundIcon(icon));
        }

        if (iconName && prefix && !config.showMissingIcons) {
            reject(new MissingIcon("Icon is missing for prefix ".concat(prefix, " with icon name ").concat(iconName)));
        } else {
            resolve({ found: false, width: 512, height: 512, icon: missing });
        }
    });
}

const generateSvgReplacementMutation = (node, { iconName, title, titleId, prefix, transform, symbol, mask, maskId, extra }) =>
    new Promise((resolve) => {
        Promise
            .all([ findIcon(iconName, prefix), findIcon(mask.iconName, mask.prefix) ])
            .then(([ main, mask ]) => {
                resolve([
                    node,
                    makeInlineSvgAbstract({
                        icons: { main, mask },
                        prefix: prefix,
                        iconName: iconName,
                        transform: transform,
                        symbol: symbol,
                        mask: mask,
                        maskId: maskId,
                        title: title,
                        titleId: titleId,
                        extra: extra,
                        watchable: true
                    })
                ]);
            });
    });

function generateLayersText(node, nodeMeta) {
    const title = nodeMeta.title,
        transform = nodeMeta.transform,
        extra = nodeMeta.extra;
    let width = null;
    let height = null;

    if (IS_IE) {
        const computedFontSize = parseInt(getComputedStyle(node).fontSize, 10);
        const boundingClientRect = node.getBoundingClientRect();
        width = boundingClientRect.width / computedFontSize;
        height = boundingClientRect.height / computedFontSize;
    }

    if (config.autoA11y && !title) {
        extra.attributes['aria-hidden'] = 'true';
    }

    return Promise.resolve([node, makeLayersTextAbstract({
        content: node.innerHTML,
        width: width,
        height: height,
        transform: transform,
        title: title,
        extra: extra,
        watchable: true
    })]);
}

function generateMutation(node) {
    const nodeMeta = parseMeta(node);

    if (~nodeMeta.extra.classes.indexOf(LAYERS_TEXT_CLASSNAME)) {
        return generateLayersText(node, nodeMeta);
    } else {
        return generateSvgReplacementMutation(node, nodeMeta);
    }
}

function onTree(root) {
    const callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    if (!IS_DOM) return;
    const htmlClassList = DOCUMENT.documentElement.classList;

    const hclAdd = function hclAdd(suffix) {
        return htmlClassList.add("".concat(HTML_CLASS_I2SVG_BASE_CLASS, "-").concat(suffix));
    };

    const hclRemove = function hclRemove(suffix) {
        return htmlClassList.remove("".concat(HTML_CLASS_I2SVG_BASE_CLASS, "-").concat(suffix));
    };

    const prefixes = config.autoFetchSvg ? Object.keys(PREFIX_TO_STYLE) : Object.keys(namespace.styles);
    const prefixesDomQuery = [
        `.${LAYERS_TEXT_CLASSNAME}:not([${DATA_FA_I2SVG}])`,
        ...prefixes.map(p => `.${p}:not([${DATA_FA_I2SVG}])`),
    ].join(', ');

    if (prefixesDomQuery.length === 0) {
        return;
    }

    let candidates = [];

    try {
        candidates = toArray(root.querySelectorAll(prefixesDomQuery));
    } catch (e) {// noop
    }

    if (candidates.length > 0) {
        hclAdd('pending');
        hclRemove('complete');
    } else {
        return;
    }

    const mark = perf.begin('onTree');
    const mutations = candidates.reduce(function (acc, node) {
        try {
            const mutation = generateMutation(node);

            if (mutation) {
                acc.push(mutation);
            }
        } catch (e) {
            if (!PRODUCTION) {
                if (e instanceof MissingIcon) {
                    console.error(e);
                }
            }
        }

        return acc;
    }, []);
    return new Promise(function (resolve, reject) {
        Promise.all(mutations).then(function (resolvedMutations) {
            perform(resolvedMutations, function () {
                hclAdd('active');
                hclAdd('complete');
                hclRemove('pending');
                if (typeof callback === 'function') callback();
                mark();
                resolve();
            });
        }).catch(function () {
            mark();
            reject();
        });
    });
}
function onNode(node) {
    const callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    generateMutation(node).then(function (mutation) {
        if (mutation) {
            perform([mutation], callback);
        }
    });
}

function replaceForPosition(node, position) {
    const pendingAttribute = "".concat(DATA_FA_PSEUDO_ELEMENT_PENDING).concat(position.replace(':', '-'));
    return new Promise(function (resolve, reject) {
        if (node.getAttribute(pendingAttribute) !== null) {
            // This node is already being processed
            return resolve();
        }

        const children = toArray(node.children);
        const alreadyProcessedPseudoElement = children.filter(function (c) {
            return c.getAttribute(DATA_FA_PSEUDO_ELEMENT) === position;
        })[0];
        const styles = WINDOW.getComputedStyle(node, position);
        const fontFamily = styles.getPropertyValue('font-family').match(FONT_FAMILY_PATTERN);
        const fontWeight = styles.getPropertyValue('font-weight');
        const content = styles.getPropertyValue('content');

        if (alreadyProcessedPseudoElement && !fontFamily) {
            // If we've already processed it but the current computed style does not result in a font-family,
            // that probably means that a class name that was previously present to make the icon has been
            // removed. So we now should delete the icon.
            node.removeChild(alreadyProcessedPseudoElement);
            return resolve();
        } else if (fontFamily && content !== 'none' && content !== '') {
            const _content = styles.getPropertyValue('content');

            const prefix = ~[ 'Solid', 'Regular', 'Light', 'Duotone', 'Brands', 'Kit' ].indexOf(fontFamily[2]) ? STYLE_TO_PREFIX[fontFamily[2].toLowerCase()] : FONT_WEIGHT_TO_PREFIX[fontWeight];
            const hexValue = toHex(_content.length === 3 ? _content.substr(1, 1) : _content);
            const iconName = byUnicode(prefix, hexValue);
            const iconIdentifier = iconName; // Only convert the pseudo element in this :before/:after position into an icon if we haven't
            // already done so with the same prefix and iconName

            if (iconName && (!alreadyProcessedPseudoElement || alreadyProcessedPseudoElement.getAttribute(DATA_PREFIX) !== prefix || alreadyProcessedPseudoElement.getAttribute(DATA_ICON) !== iconIdentifier)) {
                node.setAttribute(pendingAttribute, iconIdentifier);

                if (alreadyProcessedPseudoElement) {
                    // Delete the old one, since we're replacing it with a new one
                    node.removeChild(alreadyProcessedPseudoElement);
                }

                const meta = blankMeta();
                const extra = meta.extra;
                extra.attributes[DATA_FA_PSEUDO_ELEMENT] = position;
                findIcon(iconName, prefix).then(main => {
                    const abstract = makeInlineSvgAbstract({
                        ...meta,
                        icons: { main: main, mask: emptyCanonicalIcon() },
                        prefix: prefix,
                        iconName: iconIdentifier,
                        extra: extra,
                        watchable: true
                    });
                    const element = DOCUMENT.createElement('svg');

                    if (position === ':before') {
                        node.insertBefore(element, node.firstChild);
                    } else {
                        node.appendChild(element);
                    }

                    element.outerHTML = abstract.map(a => toHtml(a)).join('\n');
                    node.removeAttribute(pendingAttribute);
                    resolve();
                }).catch(reject);
            } else {
                resolve();
            }
        } else {
            resolve();
        }
    });
}

const replace = node => Promise.all([ replaceForPosition(node, ':before'), replaceForPosition(node, ':after') ]);

function processable(node) {
    return node.parentNode !== document.head && !~TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS.indexOf(node.tagName.toUpperCase()) && !node.getAttribute(DATA_FA_PSEUDO_ELEMENT) && (!node.parentNode || node.parentNode.tagName !== 'svg');
}

function searchPseudoElements (root) {
    if (!IS_DOM) return;
    return new Promise(function (resolve, reject) {
        const operations = toArray(root.querySelectorAll('*')).filter(processable).map(replace);
        const end = perf.begin('searchPseudoElements');
        disableObservation();
        Promise.all(operations).then(function () {
            end();
            enableObservation();
            resolve();
        }).catch(function () {
            end();
            enableObservation();
            reject();
        });
    });
}

const baseStyles = "svg:not(:root).svg-inline--fa {\n  overflow: visible;\n}\n\n.svg-inline--fa {\n  display: inline-block;\n  font-size: inherit;\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.225em;\n}\n.svg-inline--fa.fa-w-1 {\n  width: 0.0625em;\n}\n.svg-inline--fa.fa-w-2 {\n  width: 0.125em;\n}\n.svg-inline--fa.fa-w-3 {\n  width: 0.1875em;\n}\n.svg-inline--fa.fa-w-4 {\n  width: 0.25em;\n}\n.svg-inline--fa.fa-w-5 {\n  width: 0.3125em;\n}\n.svg-inline--fa.fa-w-6 {\n  width: 0.375em;\n}\n.svg-inline--fa.fa-w-7 {\n  width: 0.4375em;\n}\n.svg-inline--fa.fa-w-8 {\n  width: 0.5em;\n}\n.svg-inline--fa.fa-w-9 {\n  width: 0.5625em;\n}\n.svg-inline--fa.fa-w-10 {\n  width: 0.625em;\n}\n.svg-inline--fa.fa-w-11 {\n  width: 0.6875em;\n}\n.svg-inline--fa.fa-w-12 {\n  width: 0.75em;\n}\n.svg-inline--fa.fa-w-13 {\n  width: 0.8125em;\n}\n.svg-inline--fa.fa-w-14 {\n  width: 0.875em;\n}\n.svg-inline--fa.fa-w-15 {\n  width: 0.9375em;\n}\n.svg-inline--fa.fa-w-16 {\n  width: 1em;\n}\n.svg-inline--fa.fa-w-17 {\n  width: 1.0625em;\n}\n.svg-inline--fa.fa-w-18 {\n  width: 1.125em;\n}\n.svg-inline--fa.fa-w-19 {\n  width: 1.1875em;\n}\n.svg-inline--fa.fa-w-20 {\n  width: 1.25em;\n}\n.svg-inline--fa.fa-pull-left {\n  margin-right: 0.3em;\n  width: auto;\n}\n.svg-inline--fa.fa-pull-right {\n  margin-left: 0.3em;\n  width: auto;\n}\n.svg-inline--fa.fa-border {\n  height: 1.5em;\n}\n.svg-inline--fa.fa-li {\n  width: 2em;\n}\n.svg-inline--fa.fa-fw {\n  width: 1.25em;\n}\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: 1em;\n}\n.fa-layers svg.svg-inline--fa {\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter, .fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n}\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter {\n  background-color: #ff253a;\n  border-radius: 1em;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: #fff;\n  height: 1.5em;\n  line-height: 1;\n  max-width: 5em;\n  min-width: 1.5em;\n  overflow: hidden;\n  padding: 0.25em;\n  right: 0;\n  text-overflow: ellipsis;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-bottom-right {\n  bottom: 0;\n  right: 0;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom right;\n          transform-origin: bottom right;\n}\n\n.fa-layers-bottom-left {\n  bottom: 0;\n  left: 0;\n  right: auto;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom left;\n          transform-origin: bottom left;\n}\n\n.fa-layers-top-right {\n  right: 0;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-top-left {\n  left: 0;\n  right: auto;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top left;\n          transform-origin: top left;\n}\n\n.fa-lg {\n  font-size: 1.3333333333em;\n  line-height: 0.75em;\n  vertical-align: -0.0667em;\n}\n\n.fa-xs {\n  font-size: 0.75em;\n}\n\n.fa-sm {\n  font-size: 0.875em;\n}\n\n.fa-1x {\n  font-size: 1em;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-6x {\n  font-size: 6em;\n}\n\n.fa-7x {\n  font-size: 7em;\n}\n\n.fa-8x {\n  font-size: 8em;\n}\n\n.fa-9x {\n  font-size: 9em;\n}\n\n.fa-10x {\n  font-size: 10em;\n}\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: 2.5em;\n  padding-left: 0;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  left: -2em;\n  position: absolute;\n  text-align: center;\n  width: 2em;\n  line-height: inherit;\n}\n\n.fa-border {\n  border: solid 0.08em #eee;\n  border-radius: 0.1em;\n  padding: 0.2em 0.25em 0.15em;\n}\n\n.fa-pull-left {\n  float: left;\n}\n\n.fa-pull-right {\n  float: right;\n}\n\n.fa.fa-pull-left,\n.fas.fa-pull-left,\n.far.fa-pull-left,\n.fal.fa-pull-left,\n.fab.fa-pull-left {\n  margin-right: 0.3em;\n}\n.fa.fa-pull-right,\n.fas.fa-pull-right,\n.far.fa-pull-right,\n.fal.fa-pull-right,\n.fab.fa-pull-right {\n  margin-left: 0.3em;\n}\n\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n          animation: fa-spin 2s infinite linear;\n}\n\n.fa-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n          animation: fa-spin 1s infinite steps(8);\n}\n\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n.fa-rotate-90 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=1)\";\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=2)\";\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=3)\";\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)\";\n  -webkit-transform: scale(-1, 1);\n          transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)\";\n  -webkit-transform: scale(1, -1);\n          transform: scale(1, -1);\n}\n\n.fa-flip-both, .fa-flip-horizontal.fa-flip-vertical {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)\";\n  -webkit-transform: scale(-1, -1);\n          transform: scale(-1, -1);\n}\n\n:root .fa-rotate-90,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical,\n:root .fa-flip-both {\n  -webkit-filter: none;\n          filter: none;\n}\n\n.fa-stack {\n  display: inline-block;\n  height: 2em;\n  position: relative;\n  width: 2.5em;\n}\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1.25em;\n}\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2.5em;\n}\n\n.fa-inverse {\n  color: #fff;\n}\n\n.sr-only {\n  border: 0;\n  clip: rect(0, 0, 0, 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px;\n}\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  clip: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  position: static;\n  width: auto;\n}\n\n.svg-inline--fa .fa-primary {\n  fill: var(--fa-primary-color, currentColor);\n  opacity: 1;\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa .fa-secondary {\n  fill: var(--fa-secondary-color, currentColor);\n  opacity: 0.4;\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-primary {\n  opacity: 0.4;\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-secondary {\n  opacity: 1;\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa mask .fa-primary,\n.svg-inline--fa mask .fa-secondary {\n  fill: black;\n}\n\n.fad.fa-inverse {\n  color: #fff;\n}";

function css () {
    const dfp = DEFAULT_FAMILY_PREFIX;
    const drc = DEFAULT_REPLACEMENT_CLASS;
    const fp = config.familyPrefix;
    const rc = config.replacementClass;
    let s = baseStyles;

    if (fp !== dfp || rc !== drc) {
        const dPatt = new RegExp("\\.".concat(dfp, "\\-"), 'g');
        const customPropPatt = new RegExp("\\--".concat(dfp, "\\-"), 'g');
        const rPatt = new RegExp("\\.".concat(drc), 'g');
        s = s.replace(dPatt, ".".concat(fp, "-")).replace(customPropPatt, "--".concat(fp, "-")).replace(rPatt, ".".concat(rc));
    }

    return s;
}

class Library {
    constructor() {
        this.definitions = {};
    }
    
    add = () => {
        const _len = arguments.length, definitions = new Array(_len);
        let _key = 0;
        for (; _key < _len; _key++) {
            definitions[_key] = arguments[_key];
        }

        const additions = definitions.reduce(this._pullDefinitions, {});
        Object.keys(additions).forEach(function (key) {
            this.definitions[key] = { ...(this.definitions[key] || {}), ...additions[key] };
            defineIcons(key, additions[key]);
            build();
        });
    };
    
    reset = () => {
        this.definitions = {};
    };

    _pullDefinitions = (additions, definition) => {
        const normalized = definition.prefix && definition.iconName && definition.icon ? {
            0: definition
        } : definition;
        Object.keys(normalized).map(function (key) {
            const _normalized$key = normalized[key],
                prefix = _normalized$key.prefix,
                iconName = _normalized$key.iconName,
                icon = _normalized$key.icon;
            if (!additions[prefix]) additions[prefix] = {};
            additions[prefix][iconName] = icon;
        });
        return additions;
    };
}

function ensureCss() {
    if (config.autoAddCss && !_cssInserted) {
        insertCss(css());

        _cssInserted = true;
    }
}

function apiObject(val, abstractCreator) {
    Object.defineProperty(val, 'abstract', {
        get: abstractCreator
    });
    Object.defineProperty(val, 'html', {
        get: () => val.abstract.map(a => toHtml(a))
    });
    Object.defineProperty(val, 'node', {
        get: () => {
            if (!IS_DOM) {
                return;
            }

            const container = DOCUMENT.createElement('div');
            container.innerHTML = val.html;

            return container.children;
        }
    });

    return val;
}

function findIconDefinition(iconLookup) {
    const _iconLookup$prefix = iconLookup.prefix,
        prefix = _iconLookup$prefix === void 0 ? 'fa' : _iconLookup$prefix,
        iconName = iconLookup.iconName;
    if (!iconName) return;
    return iconFromMapping(library.definitions, prefix, iconName) || iconFromMapping(namespace.styles, prefix, iconName);
}

const resolveIcons = next => (maybeIconDefinition, params = {}) => {
    const iconDefinition = (maybeIconDefinition || {}).icon ? maybeIconDefinition : findIconDefinition(maybeIconDefinition || {});
    let mask = params.mask;

    if (mask) {
        mask = (mask || {}).icon ? mask : findIconDefinition(mask || {});
    }

    return next(iconDefinition, { ...params, mask: mask });
};

const library = new Library();
const noAuto = function noAuto() {
    config.autoReplaceSvg = false;
    config.observeMutations = false;
    disconnect();
};
let _cssInserted = false;

const autoReplace = function autoReplace() {
    const params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const _params$autoReplaceSv = params.autoReplaceSvgRoot,
        autoReplaceSvgRoot = _params$autoReplaceSv === void 0 ? DOCUMENT : _params$autoReplaceSv;
    if ((Object.keys(namespace.styles).length > 0 || config.autoFetchSvg) && IS_DOM && config.autoReplaceSvg) api.dom.i2svg({
        node: autoReplaceSvgRoot
    });
};

const dom = {
    i2svg: function i2svg() {
        const params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        if (IS_DOM) {
            ensureCss();
            const _params$node = params.node,
                node = _params$node === void 0 ? DOCUMENT : _params$node,
                _params$callback = params.callback,
                callback = _params$callback === void 0 ? function () {
                } : _params$callback;

            if (config.searchPseudoElements) {
                searchPseudoElements(node);
            }

            return onTree(node, callback);
        } else {
            return Promise.reject('Operation requires a DOM of some kind.');
        }
    },
    css: css,
    insertCss: function insertCss$$1() {
        if (!_cssInserted) {
            insertCss(css());

            _cssInserted = true;
        }
    },
    watch: function watch() {
        const params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        const autoReplaceSvgRoot = params.autoReplaceSvgRoot,
            observeMutationsRoot = params.observeMutationsRoot;

        if (config.autoReplaceSvg === false) {
            config.autoReplaceSvg = true;
        }

        config.observeMutations = true;
        domready(function () {
            autoReplace({
                autoReplaceSvgRoot: autoReplaceSvgRoot
            });
            observe({
                treeCallback: onTree,
                nodeCallback: onNode,
                pseudoElementsCallback: searchPseudoElements,
                observeMutationsRoot: observeMutationsRoot
            });
        });
    }
};

const parse = {
    transform(transformString) {
        return parseTransformString(transformString);
    }
};

const icon = resolveIcons(function (iconDefinition) {
    if (!iconDefinition) {
        return;
    }

    const {
        transform = meaninglessTransform,
        symbol = false,
        mask = null,
        maskId = null,
        title = null,
        titleId = null,
        classes = [],
        attributes = {},
        styles = {},
        prefix,
        iconName,
        icon,
    } = iconDefinition;

    function abstractCreator() {
        ensureCss();

        if (config.autoA11y) {
            if (title) {
                attributes['aria-labelledby'] = `${config.replacementClass}-title-${titleId || nextUniqueId()}`;
            } else {
                attributes['aria-hidden'] = 'true';
                attributes['focusable'] = 'false';
            }
        }

        return makeInlineSvgAbstract({
            icons: {
                main: asFoundIcon(icon),
                mask: mask ? asFoundIcon(mask.icon) : { found: false, width: null, height: null, icon: {} }
            },
            prefix: prefix,
            iconName: iconName,
            transform: { ...meaninglessTransform, ...transform },
            symbol: symbol,
            title: title,
            maskId: maskId,
            titleId: titleId,
            extra: { attributes: attributes, styles: styles, classes: classes }
        });
    }

    return apiObject({ type: 'icon', ...iconDefinition }, abstractCreator);
});

const text = function text(content, params = {}) {
    const _params$transform2 = params.transform,
        transform = _params$transform2 === void 0 ? meaninglessTransform : _params$transform2,
        _params$title2 = params.title,
        title = _params$title2 === void 0 ? null : _params$title2,
        _params$classes2 = params.classes,
        classes = _params$classes2 === void 0 ? [] : _params$classes2,
        _params$attributes2 = params.attributes,
        attributes = _params$attributes2 === void 0 ? {} : _params$attributes2,
        _params$styles2 = params.styles,
        styles = _params$styles2 === void 0 ? {} : _params$styles2;
    return apiObject({
        type: 'text',
        content: content
    }, function () {
        ensureCss();
        return makeLayersTextAbstract({
            content: content,
            transform: { ...meaninglessTransform, ...transform },
            title: title,
            extra: {
                attributes: attributes,
                styles: styles,
                classes: [`${config.familyPrefix}-layers-text`, ...classes],
            }
        });
    });
};

const counter = function counter(content) {
    const params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const _params$title3 = params.title,
        title = _params$title3 === void 0 ? null : _params$title3,
        _params$classes3 = params.classes,
        classes = _params$classes3 === void 0 ? [] : _params$classes3,
        _params$attributes3 = params.attributes,
        attributes = _params$attributes3 === void 0 ? {} : _params$attributes3,
        _params$styles3 = params.styles,
        styles = _params$styles3 === void 0 ? {} : _params$styles3;
    return apiObject({
        type: 'counter',
        content: content
    }, function () {
        ensureCss();
        return makeLayersCounterAbstract({
            content: content.toString(),
            title: title,
            extra: {
                attributes: attributes,
                styles: styles,
                classes: [ `${config.familyPrefix}-layers-counter`, ...classes ],
            }
        });
    });
};

const layer = (assembler, { classes = [] } = {}) => {
    function abstractCreator() {
        ensureCss();
        let children = [];
        assembler(function (args) {
            Array.isArray(args)
                ? args.map(a => { children = children.concat(a.abstract); }) 
                : children = children.concat(args.abstract);
        });

        return [
            {
                tag: 'span',
                attributes: {
                    class: [ `${config.familyPrefix}-layers`, ...classes ].join(' '),
                },
                children: children
            }
        ];
    }

    return apiObject({ type: 'layer' }, abstractCreator);
};

const api = {
    noAuto: noAuto,
    config: config,
    dom: dom,
    library: library,
    parse: parse,
    findIconDefinition: findIconDefinition,
    icon: icon,
    text: text,
    counter: counter,
    layer: layer,
    toHtml: toHtml
};

export { icon, noAuto, config, toHtml, layer, text, counter, library, dom, parse, findIconDefinition };