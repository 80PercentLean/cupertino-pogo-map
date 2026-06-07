import imgLuckyEgg from "@/assets/lucky-egg.webp";
import imgPbp from "@/assets/pbp.webp";
import imgStarPiece from "@/assets/star-piece.webp";
import {
  GET_CAMPFIRE_LINK,
  GET_GROUP_NAME,
  GET_IS_CENTRAL,
  GET_LOCATION,
  MAP_PATH,
  ROOT_PATH,
} from "@/constants";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router";

import BinocularsIcon from "../assets/binoculars.png";
import CampfireMapIconScreenshot from "../assets/campfire-map-icon.jpg";
import CampfireMeetupListScreenshot from "../assets/campfire-meetup-list.jpg";
import CheckInBonusScreenshot from "../assets/check-in-bonus.jpg";
import CheckInResearchFirstRewardScreenshot from "../assets/check-in-research-first-reward.jpg";
import CheckInResearchScreenshot from "../assets/check-in-research.jpg";
import Callout, { CalloutFront } from "./Callout";
import FooterTxt from "./FooterTxt";
import { useSetDocTitle } from "./hooks";
import { Button } from "./ui/button";

/**
 * Guide that shows how to check-in on Campfire.
 */
export default function CheckInGuide() {
  useSetDocTitle("How To Check Into Meetups");

  return (
    <>
      <div
        className="flex h-[33vh]"
        style={{
          background:
            "linear-gradient(0deg,rgba(255,255,255,0.75),rgba(255,255,255,0.75)),linear-gradient(315deg,#24ccaa,#a2db95 98.97%)",
        }}
      >
        <div className="mx-auto grid max-w-[65ch] grid-cols-3 grid-rows-1 gap-1">
          <img
            src={imgLuckyEgg}
            alt="Lucky Egg from Check-In Rewards"
            className="m-auto max-h-full drop-shadow-lg"
          />
          <img
            src={imgPbp}
            alt="Premium Battle Pass from Check-In Rewards"
            className="m-auto max-h-full drop-shadow-lg"
          />
          <img
            src={imgStarPiece}
            alt="Star Piece from Check-In Rewards"
            className="m-auto max-h-full drop-shadow-lg"
          />
        </div>
      </div>
      <div className="mx-auto flex min-h-screen max-w-[65ch] flex-col gap-[1em] px-4">
        <h1 className="mt-[1em] text-4xl font-extrabold tracking-tight text-balance">
          How To Check Into Meetups For Free Rewards & Special Bonuses
        </h1>
        <p className="text-muted-foreground text-xl text-pretty">
          This step-by-step guide will walk you through how you can check into
          meetups to receive free in-game items and activate special bonuses
          directly onto your Pokémon GO account.
        </p>
        <h2 className="mt-[1em] border-b pb-2 text-2xl font-semibold tracking-tight text-balance">
          1. Go to the meetup GET_LOCATION().
        </h2>
        <p className="leading-7 text-pretty">
          First, you must be physically present at the meetup GET_LOCATION()
          during the specified meetup time.
        </p>
        <p className="leading-7 text-pretty">
          For most <b>{GET_GROUP_NAME()}</b> events, this usually means you must
          be at{" "}
          <b>
            <a href={MAP_PATH} className="underline">
              {GET_LOCATION()}
            </a>
          </b>{" "}
          in order for the check-in to work.
        </p>
        <Callout
          title={
            <CalloutFront
              title="How close do I need to be to the meetup in order to check-in?"
              subtitle="Tap to learn more about the meetup check-in range."
            />
          }
          content={
            <>
              <p>
                You must be within roughly 0.6 miles of the meetup marker placed
                on Campfire.
              </p>
              <p>
                When the meetup is at {GET_LOCATION()}, this range is large
                enough to cover the entire area, so you will be able to check-in
                from the furthest corners of the park
                {!GET_IS_CENTRAL() && "/campus"}.
              </p>
            </>
          }
          className="my-[1em]"
        />
        <h2 className="mt-[1em] border-b pb-2 text-2xl font-semibold tracking-tight text-balance">
          2. Open the Campfire Meetup List.
        </h2>
        <p className="leading-7 text-pretty">
          From the in-game Pokémon GO map, tap the map icon near the top-right
          corner of the screen. This will open up Pokémon GO's built-in Campfire
          Meetup List.
        </p>
        <img
          src={CampfireMapIconScreenshot}
          alt="Screenshot showing where Campfire Map Icon is located in Pokemon GO"
          className="mx-auto mt-[1em] max-w-80"
        />
        <Callout
          title={
            <CalloutFront
              title="What is Campfire?"
              subtitle="Tap to learn more about Niantic Campfire."
            />
          }
          content={
            <>
              <p>
                <b>Niantic Campfire</b> is the Pokémon GO developer's official
                social platform for the game.
              </p>
              <p>
                <b>{GET_GROUP_NAME()}</b> is a Campfire group that hosts meetups
                through this app. We are part of the{" "}
                <a
                  href="https://pokemongo.com/find-your-community"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="font-bold underline"
                >
                  official Pokémon GO Community Ambassador Program
                </a>{" "}
                which allows us to gift you in-game rewards and activate special
                bonuses directly to your account through your check-in.
              </p>
              <p>
                Pokémon GO already comes with a light Campfire integration, so
                no additional download is required to check-in.
              </p>
              <p>
                For access to additional features like chatting and trading with
                fellow {GET_GROUP_NAME()} members, a full top-down live Raid
                map, and more, download Campfire by tapping on the button below:
              </p>
              <Button asChild>
                <a
                  href={GET_CAMPFIRE_LINK()}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="mt-[1em] w-full text-center text-lg font-bold"
                >
                  Download the Niantic Campfire app! <ExternalLink />
                </a>
              </Button>
            </>
          }
          className="mb-[1em]"
        />
        <h2 className="mt-[1em] border-b pb-2 text-2xl font-semibold tracking-tight text-balance">
          3. Find the Campfire Meetup and check-in.
        </h2>
        <p className="leading-7 text-pretty">
          The Campfire Meetup List may have other meetups in the area, so you
          will need to specifically find the one hosted by{" "}
          <b>{GET_GROUP_NAME()}</b>.
        </p>
        <p className="leading-7 text-pretty">
          Once you find the correct meetup, tap{" "}
          <span className="rounded-2xl border border-[#80CAEF] px-2 py-1 font-bold text-[#80CAEF]">
            JOIN&nbsp;MEETUP
          </span>{" "}
          .
        </p>
        <p className="leading-7 text-pretty">
          This button will change into{" "}
          <span className="rounded-2xl bg-[#6AE091] px-2 py-1 font-bold">
            CHECK&nbsp;IN
          </span>{" "}
          . Tap it again to officially check-in!
        </p>
        <Callout
          title={
            <CalloutFront
              title={
                'I can\'t check-in. Campfire says, "Too far away. Move within 1 km to check in."'
              }
              subtitle="Tap to view troubleshooting help."
              type="troubleshooting"
            />
          }
          content={
            <>
              <p>
                First make sure that you are at the correct meetup
                GET_LOCATION(). Usually it is at {GET_LOCATION()} but sometimes
                it could change, so double-check the meetup details.
              </p>
              <p>
                If you actually are at correct GET_LOCATION(), then sometimes it
                takes a little bit for your phone's GET_LOCATION() to load
                properly. Wait a few seconds before trying to check-in again.
              </p>
              <p>
                If that doesn't work, it's possible that you have the Campfire
                app but you haven't given it sufficient permissions. You can
                test this by opening the Campfire map and seeing if your phone's
                current GET_LOCATION() loads correctly.
              </p>
              <p>
                If the Campfire map isn't accurately showing your current
                position, go into your phone settings and check that you have
                granted the Campfire app{" "}
                <b>permission to access GET_LOCATION()</b> with{" "}
                <b>precise GET_LOCATION()</b>.
              </p>
            </>
          }
          type="troubleshooting"
          className="mt-[1em]"
        />
        <img
          src={CampfireMeetupListScreenshot}
          alt="Screenshot of the Campfire Meetup List"
          className="mx-auto mb-[1em] max-w-80"
        />
        <h2 className="mt-[1em] border-b pb-2 text-2xl font-semibold tracking-tight text-balance">
          4. Claim your first reward! (500 XP)
        </h2>
        <p className="leading-7 text-pretty">
          After checking into the Campfire meetup, you will receive a{" "}
          <b>Check-In Timed Research</b>.
        </p>
        <p className="leading-7 text-pretty">
          To access it, return to the Pokémon GO app and open your Event Timed
          Research Tab by tapping on the <b>Binoculars</b>{" "}
          <img
            src={BinocularsIcon}
            alt="Binoculars"
            className="inline-block h-6 w-6 rounded-full border border-[#E9A85D] bg-white"
          />{" "}
          in the bottom-right corner and tapping on the "Events" tab at the top.
        </p>
        <p className="leading-7 text-pretty">
          Then scroll down until you find the{" "}
          <b>Meetup Check-In Timed Research</b> that rewards you <b>500 XP</b>.
        </p>
        <img
          src={CheckInResearchFirstRewardScreenshot}
          alt="Screenshot of the first Check-In Timed Research reward"
          className="mx-auto my-[1em] max-w-80"
        />
        <p className="leading-7 text-pretty">
          Claim the the 500 XP so you can start progressing through the rest of
          the Check-In Timed Research that will give you the rewards you
          actually care about!
        </p>
        <Callout
          title={
            <CalloutFront
              title="Pro Tip: Claim the 500 XP reward as soon you arrive at the meetup!"
              subtitle="Tap to learn why this is a good idea."
            />
          }
          content={
            <>
              <p>
                The first page of the Check-In Timed Research always rewards 500
                XP. It only lasts 1 hour, so a lot of people forget to claim it
                and mistakenly let it expire, causing them to lose out on the
                valuable Check-In Rewards.
              </p>
              <p>
                That's why we highly recommend making sure you claim the 500 XP
                reward as soon as possible! The remaining pages after the first
                one always last for several hours, so you'll be less rushed once
                you pass the initial 500 XP page.
              </p>
            </>
          }
          className="mt-[1em]"
        />
        <Callout
          title={
            <CalloutFront
              title={
                "I checked in but I don't see the Check-In Timed Research with the 500 XP reward."
              }
              subtitle="Tap to view troubleshooting help."
              type="troubleshooting"
            />
          }
          content={
            <>
              <p>
                First, make sure that you actually checked into the meetup
                successfully.
              </p>
              <p>
                Once you've confirmed that, then sometimes it takes a little bit
                for the Check-In Timed Research to appear. Usually restarting
                the game forces it show to up.
              </p>
              <p>
                If you still don't see it, make sure that you checked in with
                the correct Campfire account that is connected to the Pokémon GO
                account you intend to receive rewards with.
              </p>
              <p>
                If it has already been over an hour since you checked in,
                unfortunately that means the first page of the Check-In Timed
                Research has expired and you will not be able to claim any
                rewards from it. Next time, claim the 500 XP as early as
                possible!
              </p>
            </>
          }
          type="troubleshooting"
          className="mb-[1em]"
        />
        <h2 className="mt-[1em] border-b pb-2 text-2xl font-semibold tracking-tight text-balance">
          5. Claim the rest of the rewards!
        </h2>
        <p className="leading-7 text-pretty">
          Now you've finally reached the main part of the Check-In Timed
          Research. All that's left for you to do is complete the remaining
          tasks to claim the best rewards the Research has to offer!
        </p>
        <img
          src={CheckInResearchScreenshot}
          alt="Screenshot of the first Check-In Timed Research reward"
          className="mx-auto my-[1em] max-w-80"
        />
        <p className="leading-7 text-pretty">
          The tasks and rewards will vary depending on the meetup's event, so
          your Check-In Timed Research may look different than the screenshot
          above.
        </p>
        <p className="leading-7 text-pretty">
          Sometimes rewards will change, but typically these are what you can
          expect for some of our meetups:
        </p>
        <div className="my-[1em] w-full overflow-y-auto">
          <table className="w-full text-pretty">
            <thead>
              <tr className="bg-muted m-0 border-t p-0">
                <th className="border px-4 py-2 text-left font-bold [[align=center]]:text-center [[align=right]]:text-right">
                  Event Type
                </th>
                <th className="border px-4 py-2 text-left font-bold [[align=center]]:text-center [[align=right]]:text-right">
                  Rewards
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="m-0 border-t p-0">
                <td className="border px-4 py-2 text-left [[align=center]]:text-center [[align=right]]:text-right">
                  Raids
                  <br />
                  <span className="text-muted-foreground italic">
                    Raid Hour/Raid Day
                  </span>
                </td>
                <td className="border px-4 py-2 text-left [[align=center]]:text-center [[align=right]]:text-right">
                  <ul className="list-disc space-y-1 pl-5">
                    <li>Premium Battle Pass</li>
                    <li>100 Link Charges</li>
                  </ul>
                </td>
              </tr>
              <tr className="m-0 border-t p-0">
                <td className="border px-4 py-2 text-left [[align=center]]:text-center [[align=right]]:text-right">
                  Max Battles
                  <br />
                  <span className="text-muted-foreground italic">
                    D-MAX & G-MAX
                  </span>
                </td>
                <td className="border px-4 py-2 text-left [[align=center]]:text-center [[align=right]]:text-right">
                  <ul className="list-disc space-y-1 pl-5">
                    <li>800 Max Particles</li>
                  </ul>
                </td>
              </tr>
              <tr className="m-0 border-t p-0">
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                  Community Days
                </td>
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                  <ul className="list-disc space-y-1 pl-5">
                    <li>Premium Battle Pass</li>
                    <li>Lucky Egg</li>
                    <li>Star Piece</li>
                    <li>Lure Module</li>
                    <li>4 Featured Pokémon with Special Background</li>
                    <li>200 Featured Pokémon Candies & 30 XL Candies</li>
                    <li> 25 Rare Candies</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="leading-7 text-pretty">
          You can find the which Check-In Bonuses were activated in the "What's
          Happening Now" section of the "Today" tab.
        </p>
        <img
          src={CheckInBonusScreenshot}
          alt="Screenshot of the Check-In Bonuses"
          className="mx-auto my-[1em] max-w-80"
        />
        <p className="leading-7 text-pretty">
          Every Check-In Timed Research page after the first one will give you
          several hours to complete them.
        </p>{" "}
        <p className="leading-7 text-pretty">
          🫡 Good luck out there Trainer. Enjoy the meetup and your freebies!
        </p>
        <hr className="mt-10" />
        <p className="text-center text-balance">
          <Link to={ROOT_PATH || "/"} className="underline">
            🏠 Return to the home page.
          </Link>
        </p>
        <hr />
        <footer className="text-muted-foreground mt-20 mb-6 flex flex-col gap-2 text-center text-sm">
          <FooterTxt />
        </footer>
      </div>
    </>
  );
}
