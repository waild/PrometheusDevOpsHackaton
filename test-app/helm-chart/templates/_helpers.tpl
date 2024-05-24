{{- define "randInt" -}}
{{- $min := int (index . 0) -}}
{{- $max := int (index . 1) -}}
{{- $rand := randAlphaNum 5 -}}
{{- $num := (mod (atoi $rand) (add (sub $max $min) 1)) -}}
{{- add $min $num -}}
{{- end -}}