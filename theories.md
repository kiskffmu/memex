---
layout: page
title: Teorie
---
<div class="theories">
{% for theory in site.data.memex.theories %}
	<h2><b>[{{ theory.category }}]</b> {{ theory.name }}</h2>
	<p>{{ theory.description }}</p>	
	<p><b>Příklady:</b> {{ theory.examples }}</p>
{% endfor %}
</div>
