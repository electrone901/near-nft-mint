# Welcome Kitten Token Page



# Notes
- near call $ID new '{"owner_id": "'$ID'", "total_supply": "1000000000000000", "metadata": { "spec": "ft-1.0.0", "name": "Example Token Name", "symbol": "EXLT", "decimals": 8 }}' --accountId $ID



- near call $ID new '{"owner_id": "'$ID'", "total_supply": "1000000000000000", "metadata": { "spec": "ft-1.0.0", "name": "CAT Token", "symbol": "CAT", "decimals": 8 }}' --accountId $ID


- I need to pass this
{
  spec: 'ft-1.0.0',
  name: 'CAT Token',
  symbol: 'CAT',
  icon: null,
  reference: null,
  reference_hash: null,
  decimals: 8
}

