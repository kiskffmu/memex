---
layout: page
title: Osobnosti
---
<div class="figures">
{% for fig in site.data.figures %}
	<h2>{{ fig.name }}</h2>
	<p>
		{% if fig.born %}*{{ fig.born }}{% endif %}
		{% if fig.deceased %}&nbsp; ✝{{ fig.deceased }}{% endif %}
	</p>
	
	<blockquote>
		{{ fig.quote }}
		<cite>{{ fig.quoteSource }}</cite>
	</blockquote>
	
	<ul class="bio">
		{% for bio in fig.bio %}
			<li>{{ bio }}</li>
		{% endfor %}
	</ul>
{% endfor %}
</div>

[tisk]({{ site.printurl }}/?generator=figures)
