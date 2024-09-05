// WYSIWYG:V1
import * as Y from 'yjs';
import { v4 as uuidv4 } from "uuid";
import { socketLookUpType } from '../../../_singleton/preMain/scripts/socketLookUp/socketRecord.types';
import { SelectionCursor } from './RealTimeYDocAdapter.d';

type input = {
  initialText?: string,  // Make initialText optional
  initialDelta?: any,    // Add initialDelta to the input type
  name: string,
  label?: string,
}

class RealTimeWysiwygAdapter {
  //id
  public id?: string = uuidv4();
  public sameDocType? = "WYSIWYG:V1";
  public name?: string;

  //props
  public order?: number = 0;
  private orderCounter?: number = 0;

  private selections?: SelectionCursor[] = []; // Updated to an array

  public ydoc?: Y.Doc;
  public yText?: Y.Text;
  public textValue?: string;
  public htmlValue?: string = "";
  public deltaValue?: any;

  //display
  public label?: string;
  public usersWhoChangedValue?: socketLookUpType[] = [];
  constructor({ initialText, initialDelta, name, label }: input) {
    this.name = name;
    this.ydoc = new Y.Doc();
    this.yText = this.ydoc.getText('quill'); // Ensure 'quill' is used as the key

    // Load delta if provided, otherwise load initial text
    if (initialDelta) {
      // const simpleDelta = { ops: [{ insert: "Hello World\n" }] };
      // this.loadQuillDelta(simpleDelta);
      this.loadQuillDelta(initialDelta);  // Apply Quill delta
    } else if (initialText) {
      this.yText.insert(0, initialText); // Insert the text content
    }

    this.textValue = this.getTextValue();
    this.htmlValue = initialText || ''; // Use initial text or empty string

    // Listen to Yjs updates
    this.ydoc.on('update', (update, origin) => {
      this.textValue = this.getTextValue();
      this.updateHtmlValueFromYjs();
    });

    // display
    this.label = label;
  }

  // Load delta into Yjs Text
  // Load delta into Yjs Text
  loadQuillDelta(delta: any) {
    try {
      if (this.yText) {
        console.log("Delta being applied:", delta);
        this.yText.applyDelta(delta.ops);  // Ensure applying only the ops array
        console.log("Yjs document state after delta:", this.yText.toDelta());
      } else {
        console.error("YText instance is not initialized.");
      }
    } catch (error) {
      console.error("Failed to apply Quill delta:", error);
    }
  }



  // loadYjsUpdate(encodedUpdate: string) {
  //   try {
  //     const binaryUpdate = Buffer.from(encodedUpdate, 'base64');
  //     Y.applyUpdate(this.ydoc, binaryUpdate);
  //     console.log("Applied Yjs Update:", this.yText.toDelta()); // For debugging
  //   } catch (error) {
  //     console.error("Failed to apply Yjs update:", error);
  //   }
  // }

  // loadDeltaIntoYjs(delta: any) {
  //   this.ydoc.getText('quill').applyDelta(delta); // Apply delta to Yjs Text
  //   console.log("Applied Delta: ", this.yText.toDelta());
  // }

  // Convert Yjs Text to HTML or another format if needed
  updateHtmlValueFromYjs() {
    // Assuming you want to convert the Yjs document to HTML or a similar format
    const delta = this.yText.toDelta();
    this.htmlValue = this.convertDeltaToHtml(delta); // You need to implement this method
    this.order = ++this.orderCounter;
  }

  // Convert Delta to HTML (or other format)
  convertDeltaToHtml(delta: any): string {
    // Implement this function to convert the Delta to HTML
    // This might involve using a library or custom conversion logic
    return ''; // Placeholder
  }

  // Get text value in base64 encoded format
  private getTextValue(): string {
    const updatedDoc = Y.encodeStateAsUpdate(this.ydoc);
    const base64Encoded = Buffer.from(updatedDoc).toString('base64');
    return base64Encoded;
  }

  // Update HTML value
  updateHtmlValue(htmlValue: string): number {
    this.htmlValue = htmlValue;
    this.order = ++this.orderCounter;
    return this.order;
  }

  // Add a new selection cursor or update if it already exists
  async addOrUpdateSelection?(selectionCursor: SelectionCursor): Promise<number> {
    // Update to handle the change from Map to Array for selections
    const index = this.selections.findIndex(sel => sel.userId === selectionCursor.userId);

    if (index !== -1) {
      this.selections[index] = selectionCursor;
    } else {
      this.selections.push(selectionCursor);
    }
    // Add socket updates with new samedoc feature

    this.order = ++this.orderCounter;

    return this.order
  }

  // Remove a selection cursor by userId
  async removeSelection?(userId: string): Promise<number> {
    const index = this.selections.findIndex(sel => sel.userId === userId);
    if (index !== -1) {
      this.selections.splice(index, 1);
    }

    this.order = ++this.orderCounter;

    return this.order
  }

  // Check if a selection cursor for a given userId exists
  hasSelection?(userId: string): boolean {
    return this.selections.some(sel => sel.userId === userId);
  }

  // Get the selection cursor of a user by userId
  getSelection?(userId: string): SelectionCursor | undefined {
    return this.selections.find(sel => sel.userId === userId);
  }

  getAllSelections?(): SelectionCursor[] {
    return [...this.selections];
  }

  async applyYdocUpdate?(savedYdocUpdate: Uint8Array): Promise<number> {
    const yText = this.ydoc.getText('quill');
    // yText.applyDelta(new Uint8Array(savedYdocUpdate))
    Y.applyUpdate(this.ydoc, new Uint8Array(savedYdocUpdate));

    this.order = ++this.orderCounter;

    return this.order
  }

  updateUsersWhoChangeValue?(socketLookUp: socketLookUpType) {
    if (this.usersWhoChangedValue.filter(u => u.userId === socketLookUp.userId).length === 0) {
      this.usersWhoChangedValue.push(socketLookUp)
    }
  }

  getData?() {

    let usersWhoChangedValue = []
    if (this.usersWhoChangedValue) {
      this.usersWhoChangedValue.map(u => {

        const safeLookUpForJson = {
          ...u,
        }

        delete safeLookUpForJson.socket;

        usersWhoChangedValue.push(safeLookUpForJson)
      })
    }

    console.log("Yjs Document State:", this.yText.toDelta());


    return {
      sameDocType: this.sameDocType,
      name: this.name,
      order: this.order,
      selections: this.selections,
      textValue: this.getTextValue(),
      label: this.label,
      htmlValue: this.htmlValue,
      usersWhoChangedValue,
    }
  }
}

export default RealTimeWysiwygAdapter;
