import {
  CAMPFIRE_LINK,
  GROUP_NAME,
  IS_CENTRAL,
  LOCATION,
  MAP_PATH,
  ROOT_PATH,
} from "@/constants";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router";

import BinocularsIcon from "../assets/binoculars.png";
import CampfireMeetupListScreenshot from "../assets/raw/5d5b9401-eb03-42e2-bf20-fdedbf7634d5.png";
import CheckInBonusScreenshot from "../assets/raw/8c547686-bf38-40a9-baaa-e68e690018fe.png";
import CheckInResearchFirstRewardScreenshot from "../assets/raw/37ea8cc7-cf94-4f02-9bfb-828df888fdd7.png";
import CampfireMapIconScreenshot from "../assets/raw/80b646b7-5624-4260-bbb9-395f902d977e.png";
import CheckInResearchScreenshot from "../assets/raw/82fdda47-23c7-4182-8dc2-b08b582a46d7.png";
import Callout, { CalloutFront } from "./Callout";
import FooterTxt from "./FooterTxt";
import { useSetDocTitle } from "./hooks";
import { Button } from "./ui/button";

/**
 * Guide that shows how to check-in on Campfire.
 */
export default function CheckInGuide() {
  useSetDocTitle("How To Check Into A Meetup");

  return (
    <div className="mx-auto flex min-h-screen max-w-[65ch] flex-col gap-4">
      <h1 className="text-4xl font-extrabold tracking-tight text-balance">
        How To Check-In For Free Rewards & Special Meetup Bonuses
      </h1>
      <p className="text-muted-foreground text-xl">
        This guide will walk you through how you can check into meetups on
        Niantic Campfire to receive premium in-game items and activate exclusive
        meetup bonuses directly onto your Pokémon GO account.
      </p>
      <h2 className="mt-[1em] border-b pb-2 text-3xl font-semibold tracking-tight">
        1. Go to the meetup location.
      </h2>
      <p className="leading-7">
        First, you must be physically present at the meetup location during the
        specified meetup time.
      </p>
      <p className="leading-7">
        For most <b>{GROUP_NAME}</b> events, this usually means you must be at{" "}
        <b>
          <a href={MAP_PATH} className="underline">
            {LOCATION}
          </a>
        </b>{" "}
        in order for the check-in to work.
      </p>
      <Callout
        title={
          <CalloutFront
            title="How close do I need to be to the meetup in order to check-in?"
            subtitle="Tap to learn more the meetup check-in range."
          />
        }
        content={
          <>
            <p>
              You must be within 1 km (which is roughly 0.6 miles) of the meetup
              marker placed on Campfire.
            </p>
            <p>
              This range is large enough to cover the entire area, so you should
              be able to check-in from the furthest corners of the park
              {!IS_CENTRAL && "/campus"} if the meetup location is {LOCATION}.
            </p>
          </>
        }
      />
      <h2 className="mt-[1em] border-b pb-2 text-3xl font-semibold tracking-tight">
        2. Open the Campfire Meetup List.
      </h2>
      <p className="leading-7">
        From the in-game Pokémon GO map, tap the map icon near the top-right
        corner of the screen. This will open up Pokémon GO's built-in Campfire
        Meetup List.
      </p>
      <img
        src={CampfireMapIconScreenshot}
        alt="Screenshot showing where Campfire Map Icon is located in Pokemon GO"
        className="mx-auto max-w-80"
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
              <b>Campfire</b> is Niantic's official social platform for Pokémon
              GO players.
            </p>
            <p>
              <b>{GROUP_NAME}</b> is a Campfire Group that hosts meetups through
              this app. We are part of the{" "}
              <b>official Pokémon GO Community Ambassador Program</b> which
              allows us to gift you in-game rewards directly to your account
              through your check-in.
            </p>
            <p>
              Pokémon GO already comes with a light integration with Campfire,
              so no additional download is required to check-in.
            </p>
            <p>
              For access to additional features like chatting and trading with
              fellow {GROUP_NAME} members, a full top-down live Raid map, and
              more, download Campfire by tapping on the button below:
            </p>
            <Button asChild>
              <a
                href={CAMPFIRE_LINK}
                rel="noopener noreferrer"
                target="_blank"
                className="mt-[1em] w-full text-center text-lg font-bold"
              >
                Download the Niantic Campfire app! <ExternalLink />
              </a>
            </Button>
          </>
        }
      />
      <h2 className="mt-[1em] border-b pb-2 text-3xl font-semibold tracking-tight">
        3. Find the Campfire Meetup and check-in.
      </h2>
      <p className="leading-7">
        The Campfire Meetup List may have other meetups in the area, so you will
        need to specifically find the one hosted by <b>{GROUP_NAME}</b>.
      </p>
      <p className="leading-7">
        Once you find the correct meetup, tap{" "}
        <span className="rounded-2xl border border-[#80CAEF] px-2 py-1 font-bold text-[#80CAEF]">
          JOIN MEETUP
        </span>{" "}
        .
      </p>
      <p className="leading-7">
        This button will change into{" "}
        <span className="rounded-2xl bg-[#6AE091] px-2 py-1 font-bold">
          CHECK IN
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
              First make sure that you are at the correct meetup location!
              Usually it is at {LOCATION} but sometimes it could change, so
              double-check the meetup details.
            </p>
            <p>
              If you actually are at correct location, then sometimes it takes a
              little bit for your phone's location to load properly. Wait a few
              seconds before trying to check-in again.
            </p>
            <p>
              If that doesn't work, it's possible that you have the Campfire app
              but you haven't given it sufficient permissions. You can test this
              by opening the Campfire map and seeing if your phone's current
              location loads correctly.
            </p>
            <p>
              If you can't see your own position on the Campfire map, or if it
              isn't accurately showing your current position, go into your phone
              settings and check that you have granted the Campfire app{" "}
              <b>permission to access location</b> with <b>precise location</b>.
            </p>
          </>
        }
        type="troubleshooting"
      />
      <img
        src={CampfireMeetupListScreenshot}
        alt="Screenshot of the Campfire Meetup List"
        className="mx-auto max-w-80"
      />
      <h2 className="mt-[1em] border-b pb-2 text-3xl font-semibold tracking-tight">
        4. Claim your first reward! (500 XP)
      </h2>
      <p>
        After checking into the Campfire meetup, you will receive a{" "}
        <b>Check-In Timed Research</b>.
      </p>
      <p className="leading-7">
        To access it, return to the Pokémon GO app and open your Event Timed
        Research Tab by tapping on the <b>Binoculars</b>{" "}
        <img
          src={BinocularsIcon}
          alt="Binoculars"
          className="inline-block h-6 w-6 rounded-full border border-[#E9A85D] bg-white"
        />{" "}
        in the bottom-right corner and pressing the "Events" tab at the top.
      </p>
      <p className="leading-7">
        Then scroll down until you find the{" "}
        <b>Meetup Check-In Timed Research</b> that rewards you <b>500 XP</b>.
      </p>
      <img
        src={CheckInResearchFirstRewardScreenshot}
        alt="Screenshot of the first Check-In Timed Research reward"
        className="mx-auto max-w-80"
      />
      <p className="leading-7">
        Claim the the 500 XP so you can start progressing through the rest of
        the Check-In Timed Research that will give you the rewards you actually
        care about!
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
              for the Check-In Timed Research to appear. Usually restarting the
              game forces it show to up.
            </p>
            <p>
              If you still don't see it, make sure that you checked in with the
              correct Campfire account that is connected to the Pokémon GO
              account you intend to receive rewards with.
            </p>
            <p>
              If it has already been over an hour since you checked in,
              unfortunately that means the first page of the Check-In Timed
              Research has expired and you will not be able to claim any rewards
              from it. Next time, claim the 500 XP as soon as you can!
            </p>
          </>
        }
        type="troubleshooting"
      />
      <h2 className="mt-[1em] border-b pb-2 text-3xl font-semibold tracking-tight">
        5. Claim the rest of the rewards!
      </h2>
      <p className="leading-7">
        Now you've finally reached the main part of the Timed Research. All
        that's left for you to do is complete the tasks to claim the best
        rewards the research has to offer!
      </p>
      <img
        src={CheckInResearchScreenshot}
        alt="Screenshot of the first Check-In Timed Research reward"
        className="mx-auto max-w-80"
      />
      <p className="leading-7">
        The tasks and rewards will vary depending on the meetup's event, so your
        Check-In Timed Research may look different than the screenshot above.
      </p>
      <p className="leading-7">
        Sometimes rewards will change, but typically these are what you can
        expect:
      </p>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          <b>Raid Events:</b> Premium Battle Pass & 100 Link Charges
        </li>
        <li>
          <b>Max Battle Events:</b> 800 Max Particles
        </li>
        <li>
          <b>Community Day:</b> Premium Battle Pass, Lucky Egg, Star Piece, Lure
          Module, 4 Featured Pokémon with Special Background, 200 Featured
          Pokémon Candies & 30 XL Candies, 25 Rare Candies
        </li>
      </ul>
      <p className="leading-7">
        You can find the which Check-In Bonuses were activated in the "What's
        Happening Now" section of the "Today" tab.
      </p>
      <img
        src={CheckInBonusScreenshot}
        alt="Screenshot of the Check-In Bonuses"
        className="mx-auto max-w-80"
      />
      <p className="leading-7">
        Usually every page after the first one of the Check-In Timed Research
        will give you several hours to complete them.
      </p>{" "}
      <p className="leading-7">
        Good luck Trainer, and enjoy the meetup and your freebies!
      </p>
      <hr className="mt-10" />
      <p className="mt-4 text-center">
        <Link to={ROOT_PATH || "/"} className="underline">
          🏠 Return to the home page.
        </Link>
      </p>
      <footer className="text-muted-foreground mt-20 flex flex-col gap-2 text-center text-sm">
        <FooterTxt />
      </footer>
    </div>
  );
}
