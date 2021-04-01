/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( 'create-block/repeater-block', {
	/**
	 * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
	 */
	apiVersion: 2,

	/**
	 * This is the display title for your block, which can be translated with `i18n` functions.
	 * The block inserter will show this name.
	 */
	title: __( 'Repeater Block', 'repeater-block' ),

	/**
	 * This is a short description for your block, can be translated with `i18n` functions.
	 * It will be shown in the Block Tab in the Settings Sidebar.
	 */
	description: __(
		'Example block written with ESNext standard and JSX support – build step required.',
		'repeater-block'
	),

	/**
	 * Blocks are grouped into categories to help users browse and discover them.
	 * The categories provided by core are `text`, `media`, `design`, `widgets`, and `embed`.
	 */
	category: 'widgets',

	/**
	 * An icon property should be specified to make it easier to identify a block.
	 * These can be any of WordPress’ Dashicons, or a custom svg element.
	 */
	icon: 'smiley',

	/**
	 * Optional block extended support features.
	 */
	supports: {
		// Removes support for an HTML mode.
		html: false,
	},
	attributes: {
		blockquote: {
			type: 'array',
			source: 'query',
			default: [{index: 0, inner_title: '', inner_subtitle:''}],
			selector: '.block_item',
			query: {
				index: {
					attribute: 'data-index',
					source: 'attribute',
					selector: 'img',
				},
				
				inner_title: {
					type: 'string',
					source: 'html',
					selector: '.block_inner--title'
				},
				inner_subtitle: {
					type: 'string',
					source: 'html',
					selector: '.block_inner--subtitle'
				},
				external_link : {
					type : 'string',
					source : 'html',
					selector : '.inner_external_link'
				},
				// in_rep_checkbox : {
				// 	source : 'attribute',
				// 	attribute: 'data-val',
				// 	selector: 'input.in_rep_checkbox_ctrl'
				// },
				src: {attribute: 'src', source: 'attribute', selector: 'img'},
				id: {attribute: 'data-id', source: 'attribute', selector: 'img'},
				alt: {attribute: 'alt', source: 'attribute', selector: 'img'},
			}
		},
		inner_checkbox_ctrl : {
			source : 'attribute',
			attribute: 'data-val',
			selector: 'input.inner_checkbox_ctrl'
		},
		show:{
			source : 'attribute',
			attribute : 'data-toggle',
			selector : 'input.inner_toggle_ctrl'
		},
		option: {
			source : 'attribute',
			attribute : 'data-radio',
			selector : 'input.inner_radio_ctrl',
			default : 'a',
		},
		column_count: {
			type:'number',
			default : 1,
			selector : 'input.column_count'
		},
		font_color : {
			type : 'string',
			default : '#333',
		},
	},

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} );
