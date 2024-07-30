import { v4 as uuidv4 } from "uuid";
import { socketLookUpType } from '../../../_singleton/preMain/scripts/socketLookUp/socketRecord.types';

type input = {
  initialValue: string, 
  name: string, 
  label?: string,
}

class RealTimeSelectAdapter {
  private orderCounter: number = 0;

  //id
  public id?: string = uuidv4();
  public sameDocType? = "SELECT:V1"
  public name?: string;

  //props
  public order?: number = 0;
  public value?: string;
  // for display, not for functionality when created.
  public user?: socketLookUpType;

  //display
  public label?: string

  constructor({ initialValue, name, label }: input) {
    this.name = name;
    this.value = initialValue
    this.label = label
  }

  async updateSelect?({ value, socketLookUp }: { value: string, socketLookUp: socketLookUpType }): Promise<number> {
    if (socketLookUp && !socketLookUp.id) {
      socketLookUp.id = socketLookUp.userId
    }
    this.user = socketLookUp
    this.value = value

    this.order = ++this.orderCounter;

    return this.order
  }
  
  getData?() {
    
    let user
    if (this.user) {
      user = {...this.user};

      delete user.socket;
    }

    return {
      sameDocType: this.sameDocType,
      name: this.name,
      order: this.order,
      value: this.value,
      user,
      label: this.label,
    }
  }
}

export default RealTimeSelectAdapter;
