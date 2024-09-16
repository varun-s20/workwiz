import React from 'react'; // Import React if necessary for JSX usage
import type { IJodit } from 'jodit/types';

const linkFormOverride = (editor: IJodit) => {
  const i18n = editor.i18n.bind(editor); // Use editor's i18n for translations

  // Return the form using JSX
  return (
    <form className="jodit_form">
      <div className="jodit_form_group">
        <label className="jodit-input-label" htmlFor="url">URL</label>
        <input
          ref={(urlInput) => { /* Add ref if needed */ }}
          className="jodit_input"
          required
          type="text"
          id="url"
          name="url"
          placeholder="http://"
        />
      </div>
      <div ref={(contentInputBox) => { /* Add ref if needed */ }} className="jodit_form_group">
        <label className="jodit-input-label" htmlFor="text">Text</label>
        <input
          ref={(contentInput) => { /* Add ref if needed */ }}
          className="jodit_input"
          id="text"
          required
          name="text"
          placeholder={i18n('Text')}
          type="text"
        />
      </div>
      <label ref={(targetCheckboxBox) => { /* Add ref if needed */ }}>
        <input
          ref={(targetCheckbox) => { /* Add ref if needed */ }}
          className="jodit_checkbox"
          name="target"
          type="checkbox"
          defaultChecked
        />
        <span>{i18n('Open in new tab')}</span>
      </label>
      <label ref={(nofollowCheckboxBox) => { /* Add ref if needed */ }}>
        <input
          ref={(nofollowCheckbox) => { /* Add ref if needed */ }}
          className="jodit_checkbox"
          name="nofollow"
          type="checkbox"
          defaultChecked
        />
        <span>{i18n('No follow')}</span>
      </label>
      <div className="jodit_buttons">
        <button
          ref={(unlinkButton) => { /* Add ref if needed */ }}
          className="jodit_button jodit_unlink_button"
          type="button"
        >
          {i18n('Unlink')}
        </button>
        <button
          ref={(insertButton) => { /* Add ref if needed */ }}
          className="jodit_button jodit_link_insert_button"
          type="submit"
        >
          {i18n('Insert')}
        </button>
      </div>
    </form>
  );
};

export const LinkPlugin = {
  formTemplate: linkFormOverride,
  noFollowCheckbox: false,
  openInNewTabCheckbox: false,
};
