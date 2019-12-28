// Enum is an object that stores some closely related values

// Use enum to signal to other devs that these are a set
//  of closely related objects
enum MatchResults {
  HomeWin = 'H',
  AwayWin = 'A',
  Draw = 'D'
}

// Use whenever we have a small fixed set of values that
// are all closely related and known at compile time.