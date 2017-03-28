---
layout: page
title: Milníky
---
<ul class="milestones">
{% for ms in site.data.milestones %}
	<li>
		<h3>{{ ms.time }} — {{ ms.short }}</h3>
		<p>{{ ms.long }}</p>
	</li>
{% endfor %}
</ul>

[tisk]({{ site.printurl }}/?generator=milestones)
