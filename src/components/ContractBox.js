
import { ContractForm, Label, Input, Select,} from "../Styles"

export const ContractBox = ({ onStrikePriceChange, onTypeChange, onBidChange, onAskChange, onLongShortChange, contract, index }) => {

    return(
        <>
        <ContractForm key={index}>
        <h3>Contract {index + 1}</h3>
        <Label>
          Strike Price:
          <Input
            type="number"
            value={contract.strike_price}
            onChange={onStrikePriceChange}
          />
        </Label>
        <Label>
          Type:
          <Select
            value={contract.type}
            onChange={onTypeChange}
          >
            <option value="Call">Call</option>
            <option value="Put">Put</option>
          </Select>
        </Label>
        <Label>
          Bid:
          <Input
            type="number"
            value={contract.bid}
            onChange={onBidChange}
          />
        </Label>
        <Label>
          Ask:
          <Input
            type="number"
            value={contract.ask}
            onChange={onAskChange}
          />
        </Label>
        <Label>
          Long/Short:
          <Select
            value={contract.long_short}
            onChange={onLongShortChange}
          >
            <option value="long">Long</option>
            <option value="short">Short</option>
          </Select>
        </Label>
      </ContractForm>
      </>
    )

}