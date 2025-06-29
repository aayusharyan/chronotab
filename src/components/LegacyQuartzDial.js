import van from "../assets/js/van.js";

export default function LegacyQuartzDial() {
  // Raw HTML snippet from original clock to rely on heavy CSS
  return van.raw(`
  <div id="clock">
    <div id="a">
        <div id="b">
            <div id="c">
                <div id="d">
                    <div id="sh">
                        <div class="hh"><div class="h"></div></div>
                        <div class="mm"><div class="m"></div><div class="mr"></div></div>
                        <div class="ss"><div class="s"></div></div>
                    </div>
                    <div id="ii">
                        <b><i></i><i></i><i></i><i></i></b>
                        <b><i></i><i></i><i></i><i></i></b>
                        <b><i></i><i></i><i></i><i></i></b>
                        <b><i></i><i></i><i></i><i></i></b>
                        <b><i></i><i></i><i></i><i></i></b>
                        <b><i></i><i></i><i></i><i></i></b>
                    </div>
                    <div id="e">
                        <div id="f"><u>12<u>1<u>2<u>3</u>4</u>5</u></u></div>
                        <div id="g"><u><u>11<u>10<u>9</u>8</u>7</u>6</u></div>
                        <div id="q"><a href="" style="position:relative;z-index:1000;color:#222;text-decoration:none;">quartz</a></div>
                    </div>
                    <div class="hh"><div class="h"></div></div>
                    <div class="mm"><div class="m"></div><div class="mr"></div></div>
                    <div class="ss"><div class="s"></div><div class="sr"></div></div>
                    <div id="k"></div>
                </div>
            </div>
        </div>
    </div>
  </div>`);
}