export default class DAO {
  constructor(token) {
    this.token = token;
    this.proposals = [];
    this.quorum = 0.1; // 10%
  }

  createProposal(title, description, creator) {
    const proposal = {
      id: this.proposals.length,
      title,
      description,
      creator,
      votesFor: 0,
      votesAgainst: 0,
      voters: {},
      executed: false
    };
    this.proposals.push(proposal);
    return proposal;
  }

  vote(id, voter, support) {
    const proposal = this.proposals[id];
    if (proposal.voters[voter]) {
      throw new Error("Already voted");
    }

    const power = this.token.balanceOf(voter);
    if (power <= 0) throw new Error("No voting power");

    if (support) proposal.votesFor += power;
    else proposal.votesAgainst += power;

    proposal.voters[voter] = true;
  }

  execute(id) {
    const proposal = this.proposals[id];
    const totalVotes = proposal.votesFor + proposal.votesAgainst;
    const supply = this.token.totalSupply;

    if (totalVotes / supply < this.quorum) {
      throw new Error("Quorum not reached");
    }

    if (proposal.votesFor > proposal.votesAgainst) {
      proposal.executed = true;
      return "Proposal PASSED";
    } else {
      return "Proposal REJECTED";
    }
  }
}
if (tx.type === "DAO_PROPOSAL") {
  this.dao.createProposal(
    tx.payload.title,
    tx.payload.description,
    tx.from
  );
}

if (tx.type === "DAO_VOTE") {
  this.dao.vote(
    tx.payload.id,
    tx.from,
    tx.payload.support
  );
}
