import { render, screen } from "@testing-library/react";

import UiOverlayCard from "../UiOverlayCard";

function TestComponentBasic() {
  return (
    <UiOverlayCard title="Lorem Ipsum">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        tempor egestas nisl sed tempor. Nullam dolor turpis, mollis et lectus
        nec, semper semper ante. Donec rutrum est quis rhoncus convallis.
        Quisque aliquam sapien ac nunc ultrices, in sagittis erat tempus. Nunc
        ligula lorem, accumsan id semper nec, vestibulum vitae massa. Aliquam
        rhoncus venenatis magna. Vestibulum quis enim viverra, sollicitudin diam
        sit amet, finibus magna. Integer sodales consectetur tempus. In blandit
        sed nisl sed efficitur. Nulla facilisis nec nisi nec eleifend. Aliquam
        sapien dui, mollis vitae consequat quis, vulputate vel odio. Vestibulum
        vitae viverra urna, sollicitudin ultricies tellus. Ut sollicitudin lorem
        a mi aliquet pharetra.
      </p>
      <p>
        Nunc pellentesque erat nec velit suscipit, sit amet pellentesque sapien
        ullamcorper. Curabitur ullamcorper, ex ut semper facilisis, purus urna
        tempor turpis, a pellentesque nulla nisi sed felis. Vestibulum eu
        tincidunt tellus. Sed nec pretium lectus. Quisque a pharetra nunc. Duis
        eget tortor ac diam imperdiet ultricies id sit amet ligula. Aliquam erat
        volutpat. Proin finibus quam orci, quis pulvinar augue tincidunt a.
        Vivamus semper, risus in mattis tempor, magna risus pharetra arcu, eu
        tempus nisl velit et mi. Cras lobortis nunc in purus bibendum
        ullamcorper. Nam imperdiet elit in ex elementum congue. Proin semper
        scelerisque felis in posuere.
      </p>
      <p>
        Morbi in iaculis magna, et lacinia tortor. Phasellus non tempor lorem.
        Ut nisi enim, pretium vel aliquet in, lobortis luctus lorem. Praesent in
        aliquam sem. Maecenas tristique ex varius dapibus laoreet. Ut gravida,
        metus ac condimentum mollis, diam nulla porttitor lectus, quis cursus
        justo diam porttitor velit. Phasellus euismod pulvinar leo, vitae
        rhoncus sapien euismod id. Nulla in nunc a odio faucibus posuere et ac
        sapien. Duis facilisis urna pulvinar ex faucibus mattis nec id tellus.
        Fusce felis sapien, placerat consectetur diam eu, iaculis feugiat ipsum.
      </p>
      <p>
        Sed in velit et arcu egestas vehicula. Maecenas ultrices mi at pharetra
        accumsan. Proin sed magna bibendum, iaculis tellus nec, egestas nisl.
        Donec et nibh tempor, accumsan massa in, accumsan mi. Vivamus nec diam
        ac erat pretium vulputate. Quisque volutpat risus ac tortor pretium, nec
        pellentesque eros vestibulum. Ut dignissim neque a nisl egestas, in
        facilisis sem ultricies. Nulla dictum tempus urna ultrices imperdiet.
        Praesent at orci ut diam iaculis imperdiet et non metus. Praesent rutrum
        euismod augue ac imperdiet. Proin quis dolor consequat, maximus ante
        vel, vehicula mi. Nullam luctus, neque eu consequat malesuada, mauris
        sem tempor libero, a aliquet nulla mauris sed diam. Ut nec ullamcorper
        tortor.
      </p>
      <p>
        Duis hendrerit, lorem quis finibus finibus, mi magna dictum leo, ac
        venenatis nibh eros a massa. Aenean nec mauris finibus, congue sapien
        sit amet, tristique libero. Ut pulvinar arcu vel nisl tincidunt, eget
        condimentum velit cursus. Aenean dapibus imperdiet est nec vehicula. Sed
        eu sem felis. Phasellus nec risus ut ligula molestie maximus. Maecenas
        quis dui nisl. Cras eget quam mi. Sed id aliquam dui. Morbi eu ex in
        ipsum condimentum posuere sed id turpis. Etiam ante tellus, luctus vel
        massa ut, tempus convallis quam. Morbi luctus justo vel ligula
        consectetur sodales.
      </p>
    </UiOverlayCard>
  );
}

function TestComponentWIconTitle() {
  return (
    <UiOverlayCard title="Icon Title">
      <p>I have an icon title!</p>
    </UiOverlayCard>
  );
}

test("loads <UiOverlayCard>", () => {
  render(<TestComponentBasic />);

  expect(screen.getByRole("heading", { name: /Lorem Ipsum/i }));
  expect(screen.getAllByRole("paragraph")).toHaveLength(5);
  expect(screen.getByRole("button", { name: /Close view/i }));
});

test("loads <UiOverlayCard> with <UiOverlayCardIconTitle>", () => {
  render(<TestComponentWIconTitle />);

  expect(screen.getByRole("heading", { name: /Icon Title/i }));
});
