
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
            onChange={(e) => onStrikePriceChange(index, 'strike_price', e.target.value)}
                
                
                // handleChange()}
          />
        </Label>
        <Label>
          Type:
          <Select
            value={contract.type}
            onChange={(e) => onTypeChange(index, 'type', e.target.value)}
                
                // handleChange()}
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
            onChange={(e) => onBidChange(index, 'bid',e.target.value )}
                
                // handleChange(index, 'bid', e.target.value)}
          />
        </Label>
        <Label>
          Ask:
          <Input
            type="number"
            value={contract.ask}
            onChange={(e) => onAskChange(index, 'ask', e.target.value)}
                
                // handleChange()}
          />
        </Label>
        <Label>
          Long/Short:
          <Select
            value={contract.long_short}
            onChange={(e) => onLongShortChange(index, 'long_short', e.target.value)}
                
                // handleChange(index, 'long_short', e.target.value)}
          >
            <option value="long">Long</option>
            <option value="short">Short</option>
          </Select>
        </Label>
      </ContractForm>
      </>
    )

}