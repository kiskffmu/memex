---
layout: page
title: Milníky
---
<ul class="milestones">
{% for ms in site.data.memex.milestones %}
	<li>
		<b>{{ ms.time }} — {{ ms.short }}</b><br>
		{{ ms.long }}
	</li>
{% endfor %}
</ul>
