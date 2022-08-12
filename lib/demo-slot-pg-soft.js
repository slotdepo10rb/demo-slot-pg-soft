'use babel';

import DemoSlotPgSoftView from './demo-slot-pg-soft-view';
import { CompositeDisposable } from 'atom';

export default {

  demoSlotPgSoftView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.demoSlotPgSoftView = new DemoSlotPgSoftView(state.demoSlotPgSoftViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.demoSlotPgSoftView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'demo-slot-pg-soft:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.demoSlotPgSoftView.destroy();
  },

  serialize() {
    return {
      demoSlotPgSoftViewState: this.demoSlotPgSoftView.serialize()
    };
  },

  toggle() {
    console.log('DemoSlotPgSoft was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
