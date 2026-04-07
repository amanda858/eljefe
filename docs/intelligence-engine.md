# El Jefe Intelligence Engine

## Objective

Build a market intelligence layer that combines the strongest parts of books, expert tools, simulation engines, and public attention signals into one ranked action feed.

## Source classes

1. Market prices
   - Sportsbooks
   - Exchanges
   - Openers, live prices, closers

2. Expert and editorial signals
   - Pick sites
   - Handicappers
   - Historical trend pages

3. Crowd and attention signals
   - Consensus pages
   - Community commentary
   - Search interest and breakout topics
   - YouTube creator narratives

4. Internal modeling
   - Vig removal
   - Fair-price conversion
   - Simulations
   - Injury, lineup, and state adjustments

## Core scoring dimensions

1. Edge
   - Difference between market price and internal fair price

2. Confidence
   - Agreement between models, books, and signal sources

3. Time-to-intercept
   - Estimated seconds or minutes before the broader market adjusts

4. Source quality
   - Historical usefulness of the signal source versus closing-line efficiency

## Product output

The finished El Jefe feed should not show disconnected picks. It should show ranked opportunities with:

- Market and book
- Fair price
- EV
- Confidence
- Trigger source
- Time-to-intercept
- Recommended workflow or alert destination

## Self-learning loop

The system should improve by measuring process quality, not by pretending to promise impossible hit rates.

1. Store every open, alert, execution, and close
   - Measure whether the signal beat close
   - Measure whether the timing window was real

2. Reweight source quality continuously
   - Upgrade sources that still lead repricing
   - Downgrade sources that degrade into noise

3. Calibrate confidence by sport and market family
   - Sides, totals, props, and derivatives should not share the same confidence behavior
   - Calibration should be sport-specific and regime-aware

4. Learn from workflows, not just winners
   - The goal is to improve repeatable edge capture
   - One lucky hit should not distort the model stack

## Accuracy standard

El Jefe should never market fake certainty. The defensible standard is better calibration, faster interception, more closing-line wins, and cleaner process discipline over time.

## Governance surfaces

The product should expose its own learning behavior internally:

1. Results ledger
   - Show alert price, close price, and whether the system beat close
   - Capture the lesson that changed the weighting stack

2. Calibration tracker
   - Show current versus prior calibration scores by model family
   - Make drift visible instead of hiding it behind marketing language

3. Model version history
   - Record what changed, why it changed, and what behavior improved
   - Treat model updates like real product releases with measurable impact

## Strategic rule

Use free and public signal sources for discovery. Use proprietary scoring, speed, and workflow tooling for advantage.